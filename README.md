# Tempa123 website design studio

This Thai-first preview helps a small business choose a website direction, understand the setup work and prepare a project enquiry. The finder uses actual catalog categories and names to propose a small shortlist. Product descriptions from the original catalog remain in English where labeled. Design illustrations represent visual directions. The AI-generated studio photograph is illustrative; its original is in artwork-originals/ and its responsive WebP derivatives in public/media/.

## Develop and verify

Use Node 22.12+ or a compatible Node 24 installation. Run npm ci, npm run build, npx tsc --noEmit, then npm run preview for a local inspection. Vite preview serves static files. Use netlify dev to include the enquiry Function. The build prerenders all known routes and a 404 document using the same React pages and metadata as the client. A browser bridge preserves old /#/ links; public/_redirects supplies the final unmatched-path 404. The static HTML reviewer uses a hash router and marks enquiry submission unavailable.

The preview deliberately sends noindex headers and meta directives and blocks crawling. Before an approved production release confirm the public domain, install valid canonicals, sitemap, social URLs, locale strategy and production indexing policy. Existing project is tempa123, site a7253b68-9757-450f-9ce9-52a64a89fddf; GitHub production branch is main. Production GA4 property tag runs on the custom host only. Native browser permission settings may suppress analytics.

## Enquiry handling

POST /api/enquiries runs a Netlify Function. It validates origin, content type, consent, body size, input lengths and idempotency. Rate policy is 6 requests/minute per IP/domain; verify enforcement on the active hosting plan. A site-scoped Netlify Blobs store retains enquiries for authorized staff. The store is tempa-enquiries for the confirmed production context or tempa-enquiries-preview otherwise. A separate client retry uses the same reference for matching input after a delayed response. Use the Netlify console with restricted team access to review enquiries. There is no email notification configured. No plaintext secret or custom client API key is required. Configure the operator’s review, retention and notification process before commercial release. Verify an actual draft-context receipt and private storage, then inspect one GA4 lead after authorized production launch. Download quotas/payment collection are disabled pending an authenticated commerce service.

## Rollback

This feature branch and its draft PR leave the published deployment in place. Close the PR to discard the preview. If subsequently released, revert the release commit and redeploy the known-good revision through CI. Preserve enquiry records and reconcile received references. Do not revert to browser-authorized paid access.
