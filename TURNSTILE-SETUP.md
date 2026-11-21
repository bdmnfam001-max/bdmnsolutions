# Turnstile and contact-form setup

The contact endpoint fails closed. It will not forward a message when a site key, server secret, hostname allowlist, token, or successful verification is missing.

## Cloudflare widget

Create a Turnstile widget in the Cloudflare dashboard with:

- Widget type: **Managed**
- Appearance: **Interaction-only**
- Execution: **Execute**
- Action: **contact**
- Hostnames: add each exact hostname visitors use (local development, the verified production domain, and any preview hostnames that need to submit the form). Do not add a wildcard.

Copy its site key and secret key. The code calls the explicit JavaScript API only after client-side validation passes, then verifies the token on the server before forwarding to FormSubmit.

## Environment variables

In Vercel, open **Settings → Environment Variables** and add these for the environments that should accept inquiries:

- `VITE_TURNSTILE_SITE_KEY` — public site key; Vite exposes `VITE_` values to browser code.
- `TURNSTILE_SECRET_KEY` — private Turnstile secret; never add a `VITE_` prefix.
- `TURNSTILE_ALLOWED_HOSTNAMES` — comma-separated exact hostnames. For local test keys, use `localhost,127.0.0.1`. The current v0 preview hostname is `sb-60sdp7d65upz.vercel.run`; include it only when testing that preview and add it to the Cloudflare widget's hostname list too.

The previously used production domain `bedmanskyysite.vercel.app` could not be verified in this Vercel project, so do not use it as a production hostname or canonical URL until it is confirmed. Add the verified production hostname and any required Vercel preview hostnames individually—never use a wildcard.

For local development, copy `.env.example` to `.env.local` and set the same three values. The example file contains no credentials.

## Local test keys

Cloudflare's published test pair is:

- Site key: `3x00000000000000000000FF`
- Secret key: `1x0000000000000000000000000000000AA`

Use this pair only in local development, with `TURNSTILE_ALLOWED_HOSTNAMES=localhost,127.0.0.1`. These keys are public test credentials: they do not protect a production form and must never replace the real production pair. Test keys and production keys are not interchangeable.

## Contact delivery

Verified inquiries are sent server-to-server to the already activated FormSubmit address `dennisbedmansky@gmail.com`. The browser never calls FormSubmit directly. Local Vite development serves the same `/api/contact` handler through its development middleware; Vercel deploys the root `api/contact.ts` file as a serverless function.
