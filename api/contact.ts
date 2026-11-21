import { randomUUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

type SubmissionResult = {
  status: number;
  body: { ok: true; message: string } | { ok: false; error: string };
};

type ContactRequest = Pick<IncomingMessage, 'method' | 'headers'> & { body?: unknown };

const MAX_BODY_BYTES = 12_000;
const WEBSITE_TYPES = new Set([
  'Website Design',
  'Business Automation',
  'Website + Automation',
  'Other',
]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function response(status: number, error: string): SubmissionResult {
  return { status, body: { ok: false, error } };
}

function readField(payload: Record<string, unknown>, key: string, maxLength: number): string | null {
  const value = payload[key];
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string' || value.length > maxLength) return null;
  return value.trim();
}

function headerValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

export async function processContactSubmission(request: ContactRequest): Promise<SubmissionResult> {
  if (request.method !== 'POST') return response(405, 'Use POST to send a project inquiry.');

  const contentType = headerValue(request.headers['content-type']).toLowerCase();
  if (!contentType.startsWith('application/json')) {
    return response(415, 'The request must use JSON.');
  }

  const rawBody = request.body;
  const encodedBody = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody ?? '');
  if (new TextEncoder().encode(encodedBody).byteLength > MAX_BODY_BYTES) {
    return response(413, 'The inquiry is too large. Please shorten the project details.');
  }

  let value: unknown = rawBody;
  if (typeof rawBody === 'string') {
    try {
      value = JSON.parse(rawBody);
    } catch {
      return response(400, 'The inquiry could not be read. Please check the form and try again.');
    }
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return response(400, 'Please complete the required project details.');
  }

  const payload = value as Record<string, unknown>;
  const name = readField(payload, 'name', 100);
  const businessName = readField(payload, 'businessName', 120);
  const email = readField(payload, 'email', 254);
  const websiteType = readField(payload, 'websiteType', 60);
  const processes = readField(payload, 'processesToAutomate', 2_000);
  const details = readField(payload, 'details', 4_000);
  const honeypot = readField(payload, '_honey', 500);
  const token = readField(payload, 'turnstileToken', 2_048);

  if ([name, businessName, email, websiteType, processes, details, honeypot, token].includes(null)) {
    return response(400, 'One or more fields are invalid or too long.');
  }
  if (honeypot) return response(400, 'The inquiry could not be verified. Please try again.');
  if (!name || !email || !websiteType || !details) {
    return response(400, 'Please complete the required project details.');
  }
  if (!EMAIL_PATTERN.test(email)) return response(400, 'Please enter a valid email address.');
  if (!WEBSITE_TYPES.has(websiteType)) return response(400, 'Please select a valid website type.');
  if (!token) return response(403, 'Please complete the security check and try again.');

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? '')
    .split(',')
    .map((hostname) => hostname.trim().toLowerCase().replace(/\.$/, ''))
    .filter(Boolean);
  if (!secret || allowedHostnames.length === 0) {
    return response(503, 'Secure form submissions are not configured yet. Please email us directly.');
  }

  let verification: {
    success?: boolean;
    hostname?: string;
    action?: string;
  } | null = null;
  try {
    const verificationBody = new URLSearchParams({
      secret,
      response: token,
      idempotency_key: randomUUID(),
    });
    const verificationResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: verificationBody,
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (verificationResponse.ok) {
      const result: unknown = await verificationResponse.json();
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        const parsed = result as Record<string, unknown>;
        verification = {
          success: parsed.success === true,
          hostname: typeof parsed.hostname === 'string' ? parsed.hostname : undefined,
          action: typeof parsed.action === 'string' ? parsed.action : undefined,
        };
      }
    }
  } catch {
    return response(502, 'The security check is temporarily unavailable. Please try again.');
  }

  const hostname = verification?.hostname?.toLowerCase().replace(/\.$/, '');
  if (
    !verification?.success ||
    verification.action !== 'contact' ||
    !hostname ||
    !allowedHostnames.includes(hostname)
  ) {
    return response(403, 'The security check could not be verified. Please try again.');
  }

  const form = new URLSearchParams({
    name,
    businessName: businessName ?? '',
    email,
    websiteType,
    processesToAutomate: processes ?? '',
    details,
    _subject: 'New project inquiry — Bedmansky Digital Solutions Studio',
    _template: 'table',
    _captcha: 'false',
  });

  try {
    const formSubmitResponse = await fetch('https://formsubmit.co/ajax/dennisbedmansky@gmail.com', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
      signal: AbortSignal.timeout(10_000),
    });
    const formSubmitResult = (await formSubmitResponse.json().catch(() => null)) as
      | { success?: unknown }
      | null;
    if (!formSubmitResponse.ok || String(formSubmitResult?.success).toLowerCase() !== 'true') {
      return response(502, 'Your inquiry could not be delivered. Please email us directly.');
    }
  } catch {
    return response(502, 'Your inquiry could not be delivered. Please email us directly.');
  }

  return {
    status: 200,
    body: { ok: true, message: 'Your inquiry has been sent. We will get back to you shortly.' },
  };
}

export default async function handler(
  request: IncomingMessage & { body?: unknown },
  result: ServerResponse,
): Promise<void> {
  const submission = await processContactSubmission(request);
  result.statusCode = submission.status;
  result.setHeader('Content-Type', 'application/json; charset=utf-8');
  result.setHeader('Cache-Control', 'no-store');
  result.end(JSON.stringify(submission.body));
}
