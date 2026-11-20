import { createHash, randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';

export const config = {
  path: '/api/enquiries',
  rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 6 },
};

const bodyLimit = 16384;
const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const digest = text => createHash('sha256').update(text).digest('hex');
const reply = (data, status, headers = {}) => Response.json(data, {
  status,
  headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
});

function cleanText(value, max, min = 0) {
  if (value === undefined && !min) return '';
  if (typeof value !== 'string') return null;
  const text = value.trim().normalize('NFC');
  if (text.length < min || text.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)) return null;
  return text;
}

async function readBody(request) {
  if (Number(request.headers.get('Content-Length')) > bodyLimit) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new Error();
  let length = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > bodyLimit) {
      await reader.cancel();
      throw new RangeError();
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function parseEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || input.website || input.consent !== true) return null;
  const fields = {
    name: cleanText(input.name, 100, 1),
    email: cleanText(input.email, 254, 3),
    brief: cleanText(input.brief, 3000, 10),
    template: cleanText(input.template, 160),
    package: cleanText(input.package, 160),
    estimate: cleanText(input.estimate, 240),
    addons: cleanText(input.addons, 400),
  };
  if (Object.values(fields).some(value => value === null) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return null;
  return fields;
}

export async function acceptEnquiry(request, context, openStore = getStore) {
  if (request.method !== 'POST') return reply({ error: 'method' }, 405, { Allow: 'POST' });
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return reply({ error: 'origin' }, 403);
  if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply({ error: 'format' }, 415);
  const key = request.headers.get('Idempotency-Key') ?? '';
  if (!uuidV4.test(key)) return reply({ error: 'request_key' }, 422);

  let input;
  try { input = await readBody(request); }
  catch (error) { return reply({ error: 'body' }, error instanceof RangeError ? 413 : 400); }
  const fields = parseEnquiry(input);
  if (!fields) return reply({ error: 'fields' }, 422);

  // Preview/local deployments default to an isolated inbox if context is absent.
  const production = context?.deploy?.context === 'production';
  const storeName = production ? 'tempa-enquiries' : 'tempa-enquiries-preview';
  const payloadHash = digest(JSON.stringify(fields));
  const storageKey = digest(key.toLowerCase());
  try {
    const store = openStore({ name: storeName, consistency: 'strong' });
    const reference = 'TMP-' + randomUUID().slice(0, 18).replaceAll('-', '').toUpperCase();
    const record = { reference, receivedAt: new Date().toISOString(), payloadHash, ...fields, consent: true };
    const { modified } = await store.setJSON(storageKey, record, { onlyIfNew: true });
    if (modified) return reply({ reference, preview: !production }, 201);
    const existing = await store.get(storageKey, { type: 'json', consistency: 'strong' });
    if (!existing) return reply({ error: 'storage' }, 503, { 'Retry-After': '5' });
    if (existing.payloadHash !== payloadHash) return reply({ error: 'key_conflict' }, 409);
    return reply({ reference: existing.reference, preview: !production }, 200);
  } catch {
    // Never log the customer's brief, name, email, or idempotency key.
    console.error('Enquiry storage unavailable', context?.requestId ?? '');
    return reply({ error: 'storage' }, 503, { 'Retry-After': '5' });
  }
}
export default (request, context) => acceptEnquiry(request, context);
