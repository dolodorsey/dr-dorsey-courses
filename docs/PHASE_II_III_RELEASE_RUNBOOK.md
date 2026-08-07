# The Lifestyle University — Phase II/III Release Runbook

## Architecture

No GoHighLevel/GHL is used in the active system.

- **Supabase** — canonical backend: auth, catalog, lessons, progress, assessments, entitlements, purchases, subscriptions, certificates, resources, notifications, recommendations, media-production queue and reporting.
- **Stripe** — payment processor only. Checkout is created through the Supabase `tlu-commerce` Edge Function and fulfilled into Supabase.
- **Vercel** — frontend runtime for the dedicated Lifestyle University app.
- **GitHub** — application source/version history.
- **Google Sheets** — reporting mirror only. It is not a source of truth.
- **AWS SES** — direct transactional email transport once credentials are stored in Supabase Vault.

## Phase II — Course Production

Current structured inventory:

- 10 flagship programs
- 80 curriculum modules
- 320 student-facing lessons
- 320 presenter scripts
- 320 video-production briefs
- 80 module implementation assessments
- 10 capstones
- 105 protected implementation tools/templates
- 10 certificate design briefs

### Media production system

`public.tlu_media_production` is the lesson-level production ledger.

Pipeline:

`machine QA → human editorial review → recording → transcript → lesson graphics → resource QA → media QA → publish`

All 320 lessons currently pass the structural machine-QA gate and are queued for human editorial review.

`public.tlu_recording_batches` groups production into **80 four-lesson recording batches** (one batch per module). Each batch carries camera, audio, wardrobe, prop, continuity and target-duration notes.

Do not mark a lesson `published` merely because the script exists. Final media status requires the real recorded asset, transcript, graphics/resources and media QA.

## Phase III — LMS and Lifecycle

Deployed Supabase Edge Functions:

- `tlu-commerce` — Stripe Checkout creation, checkout confirmation, customer portal and fulfillment.
- `tlu-lms` — dashboard, protected course detail, progress, assessments, templates, notifications and recommendations.
- `tlu-stripe-webhook` — verified Stripe lifecycle handler; custom signature verification; checkout/subscription/refund handling.
- `tlu-email-dispatch` — direct AWS SES outbox dispatcher with retry logic.
- `tlu-integration-health` — non-secret health snapshot for release checks.

### Learner lifecycle

`account → checkout → verified purchase → enrollment → welcome → progress → module checks → capstone → certificate → consultation/service/membership/next-course recommendations`

Milestones:

- 25% — progress notification
- 50% — consultation recommendation
- 75% — relevant done-for-you service recommendation
- 100% — capstone prompt, All Access recommendation and next-course recommendation

Certificate issuance requires the configured course completion threshold plus a passing capstone.

## Commerce Release Gate

### Ready

- 10/10 flagship course product records have Stripe price IDs.
- Checkout records are idempotent by Stripe session ID.
- Subscription records are idempotent by Stripe subscription ID.
- The Stripe webhook Edge Function is deployed.
- Refund handling can revoke purchase-sourced course access.

### External blocker

The Stripe account still needs the webhook endpoint registered and its exact Stripe signing secret stored in Supabase Vault as:

`tlu_stripe_webhook_secret`

Target endpoint:

`https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/tlu-stripe-webhook`

After registration, execute one real/test-mode lifecycle through the connected Stripe account:

1. Checkout completed.
2. Purchase row created/updated once.
3. Enrollment granted once.
4. Refund event received.
5. Purchase marked refunded.
6. Purchase-sourced enrollment revoked.
7. Commerce-event ledger contains no duplicate fulfillment.

The four membership product records still need Stripe Price IDs before membership Checkout is production-ready.

## Email Release Gate

The Supabase outbox is self-running with `pg_cron` + `pg_net`.

Cron job:

`tlu-email-dispatch-every-5-min` → `*/5 * * * *`

The job remains intentionally dormant until SES credentials exist. Store these values in **Supabase Vault**, not GitHub and not the browser:

- `aws_access_key_id`
- `aws_secret_access_key`
- `aws_region`
- `ses_from_email`
- optional: `ses_from_name`

The dispatcher:

- atomically claims pending jobs with `FOR UPDATE SKIP LOCKED`
- sends through SESv2
- records success in the outbox
- retries transient failures
- marks a job failed after the retry ceiling

## Reporting

Canonical Supabase reporting views:

- `tlu_reporting_course_performance`
- `tlu_reporting_production`
- `tlu_reporting_commerce`
- `tlu_reporting_student_progress`
- `tlu_reporting_integration_health`

The Google Sheets Operations Dashboard is a presentation/reporting mirror only. Operational writes must continue to originate in Supabase.

## Production Definition of Done

A course is not fully production-complete until:

- human editorial review is approved
- all 32 videos are recorded and approved
- transcripts are generated and approved
- lesson graphics are approved
- linked resources pass QA
- capstone/rubric is tested
- certificate artwork is approved
- media QA passes
- the course is published
- checkout fulfillment has been tested end-to-end
- welcome email transport has been tested end-to-end

## Current hard blockers

1. Stripe connector/account-side webhook registration and signing secret.
2. AWS SES credentials/from identity are not present in Supabase Vault.
3. Physical media recording, transcript generation from final recordings and final design production require real production inputs/assets.
