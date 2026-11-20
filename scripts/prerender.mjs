import { readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const output = path.resolve('dist');
const temporary = path.resolve('.build-ssr');
const shell = await readFile(path.join(output, 'index.html'), 'utf8');

function escape(text) {
  return text.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

function documentFor(page) {
  const title = escape(page.title);
  const description = escape(page.description);
  const pageHead = [
    '<title>' + title + '</title>',
    '<meta name="description" content="' + description + '">',
    '<meta property="og:title" content="' + title + '">',
    '<meta property="og:description" content="' + description + '">',
    '<meta property="og:site_name" content="Tempa123">',
    '<meta property="og:type" content="website">',
  ];
  if (page.schema) {
    const data = JSON.stringify(page.schema).replace(/</g, '\\u003c');
    pageHead.push('<script id="page-schema" type="application/ld+json">' + data + '</script>');
  }
  const root = '<div id="root"></div>';
  if (!shell.includes(root)) throw new Error('Expected client mount element in index.html');
  return shell.replace(/<title>[^<]*<\/title>/,'').replace(/<meta name="description"[^>]*>/,'')
    .replace('</head>', () => pageHead.join('\n') + '</head>')
    .replace(root, () => '<div id="root">' + page.html + '</div>');
}

try {
  await build({
    configFile: false,
    publicDir: false,
    resolve: { alias: [{
      find: /^(?:\.\.\/)+components\/Seo$/,
      replacement: path.resolve('scripts/prerender-seo.tsx'),
    }, {
      find: './components/Seo',
      replacement: path.resolve('scripts/prerender-seo.tsx'),
    }] },
    build: { ssr: 'src/entry-server.tsx', outDir: temporary, emptyOutDir: true, copyPublicDir: false },
  });
  const { renderPage, routes } = await import(pathToFileURL(path.join(temporary, 'entry-server.js')).href);
  if (new Set(routes).size !== routes.length) throw new Error('Duplicate route in the static inventory');
  for (const route of routes) {
    const segments = route.split('/').filter(Boolean).map(decodeURIComponent);
    if (segments.some(s => s === '..' || s === '.' || /[\\/]/.test(s))) throw new Error('Invalid route segment in ' + route);
    const directory = path.join(output, ...segments);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), documentFor(renderPage(route)));
  }
  await writeFile(path.join(output, '404.html'), documentFor(renderPage('/__not-found__')));
  console.log('Wrote ' + routes.length + ' static route documents and 404.html');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
