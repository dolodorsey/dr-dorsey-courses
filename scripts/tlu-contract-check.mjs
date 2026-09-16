import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const expect = (condition, message) => {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${message}`);
  }
};

const tlu = read("app/lib/tlu.js");
const coursePage = read("app/courses/[slug]/page.js");
const consultationPage = read("app/consultations/[slug]/page.js");
const actions = read("app/components/ConsultationActions.js");
const successPage = read("app/consultations/checkout/success/page.js");
const proxy = read("app/api/tlu/commerce/route.js");

expect(tlu.includes("tlu-lms") && tlu.includes("tlu-commerce") && tlu.includes("tlu-consultations"), "canonical Supabase TLU edge-function routes are present");
expect(tlu.includes("getHakunaBridge"), "Hakuna Matata bridge helper is present");
expect(coursePage.includes("HakunaMethodBlock") && coursePage.includes("getHakunaBridge"), "flagship course pages render Hakuna Matata method data");
expect(consultationPage.includes("HakunaMethodBlock") && consultationPage.includes("getHakunaBridge"), "Strategy Room pages render Hakuna Matata method data");
expect(actions.includes("requiresApplication") && actions.includes("application_id") && actions.includes("create_checkout"), "application-first consultation checkout gating is present");
expect(actions.includes("confirm_checkout"), "post-checkout confirmation path is present");
expect(successPage.includes("dr-dorsey-strategy-consultation") && successPage.includes("10:00 AM–6:00 PM Eastern"), "verified Strategy Room booking fallback is present");
expect(proxy.includes("requestIsSameOrigin") && proxy.includes("authenticatedFetch"), "commerce proxy enforces same-origin and authenticated forwarding");

const expectedConsultationProducts = [
  "consult-discovery-call",
  "consult-strategy-session",
  "consult-implementation-deep-dive-deposit",
  "consult-vip-intensive-deposit",
  "consult-private-advisory-deposit",
  "consult-premium-cohort-deposit",
  "consult-elite-mentorship-deposit",
  "consult-mastery-certification-deposit",
];
for (const slug of expectedConsultationProducts) {
  expect(consultationPage.includes(slug), `consultation product mapping includes ${slug}`);
}

expect(!consultationPage.includes("consult-90-day-advisory"), "retired 90-Day Advisory checkout slug is not referenced by Strategy Room UI");

if (process.exitCode) process.exit(process.exitCode);
console.log("TLU contract check complete.");
