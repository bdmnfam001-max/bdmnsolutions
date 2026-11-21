# Project memory

## Product intent & audience

- **Bedmansky** — business website offering two complementary services: website development and automation.
- Audience: businesses seeking to reduce repetitive work and speed up follow-ups via automation, plus premium website development.
- Site doubles as a portfolio/showcase for both services.

## Brand personality & voice

- Premium, editorial, professional; concise business-benefit copy.
- Avoids invented ROI statistics or guaranteed savings claims.
- Slogan style: "Less manual data entry. Faster follow-ups. More time for your business."

## Visual design & UX direction

- Aesthetic: black/navy surfaces, electric-blue accents, editorial typography.
- Logo: "BD" monogram with blue accent; transparent version derived from `BDsologo.png` (original had baked-in black RGB background, no alpha).
- Automation workflow pattern (reusable): NEW CUSTOMER INQUIRY → AUTOMATIC PROCESSING → CRM UPDATED → TEAM NOTIFIED → FOLLOW-UP READY. Connected nodes, small blue data pulses on connection lines, sequential node highlight, processing statuses, clear completed state. Subtle/smooth, no glow/particles/3D/new animation libs.
- Interactive demo modal: labeled "INTERACTIVE WORKFLOW DEMO"; Start + Replay; auto-runs sequence; closes via button, Escape, overlay; focus handling; timer cleanup on close/unmount; simulated only (no real CRM/email/API).
- Hero: four animated floating website cards preserved; automation visual integrated deliberately — desktop compact flow near collage, mobile simplified row beneath collage in normal flow (not fragile absolute offsets).
- Portfolio: upgraded automation panel into premium mini-showcase (abbreviated workflow logic/styling from demo), optional "View Demo" link to same modal; four existing website cards untouched.
- Responsive targets: 320px, 375px, 430px, 768px, 1440px. No horizontal scroll, no overlap/clipping, touch-friendly controls, no layout shifts. Respect `prefers-reduced-motion`; pause/minimize decorative animations.

## Decisions, constraints & rationale

- Stack: React + TypeScript + Vite. Do not change global fonts, colors, typography, spacing, or visual identity.
- No new dependencies; no redesign. Reuse existing components/CSS.
- Do not modify: Services/About/FAQ/Process content, calculator logic, contact form/Turnstile/backend, existing portfolio projects, navigation, CTA behavior outside requested demo.
- Logo fix targets actual cause (asset alpha / relevant CSS only), not blend modes or unrelated CSS; same monogram/proportions/accent preserved. Asset paths/filename casing checked for production.
- Build once with `npm run build`; fix only errors caused by these changes. No branch/merge/deploy.
- Report unresolved blockers plainly rather than pretending fixes.

## Open questions & assumptions

- Assumed transparent logo conversion succeeded and displays cleanly across header (desktop/mobile) and footer; if any background remains, asset regeneration may be needed.
- Workflow demo statuses/labels are simulated copy, not tied to real integration semantics.
- No explicit design-token source file referenced; inferred existing tokens are reused as-is.