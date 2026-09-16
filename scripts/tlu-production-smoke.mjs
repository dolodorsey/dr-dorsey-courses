const base = process.env.TLU_PRODUCTION_URL || "https://youtube-university.vercel.app";

const courseSlugs = [
  "event-money-machine",
  "nightlife-money-machine",
  "lifestyle-specialist-blueprint",
  "automate-your-business-os",
  "restaurant-qsr-blueprint",
  "audience-to-income-system",
  "culture-brand-ecommerce",
  "service-business-scale",
  "app-launch-blueprint",
  "venue-revenue-blueprint",
];

const consultationSlugs = [
  "discovery-call",
  "strategy-session",
  "implementation-deep-dive",
  "vip-intensive",
  "private-advisory",
  "premium-cohort",
  "elite-mentorship",
  "mastery-certification",
];

async function check(path, { method = "GET", expected = [200], contains = [], retries = method === "GET" ? 6 : 1 } = {}) {
  const url = `${base}${path}`;
  const expectedStatuses = Array.isArray(expected) ? expected : [expected];
  let last = null;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { method, redirect: "follow" });
      const text = await res.text();
      last = { status: res.status, text };
      const missing = contains.filter((needle) => !text.includes(needle));
      if (expectedStatuses.includes(res.status) && missing.length === 0) {
        console.log(`PASS ${method} ${path} -> ${res.status}`);
        return;
      }
      if (method !== "GET") break;
    } catch (error) {
      last = { error: error.message, text: "" };
      if (method !== "GET") break;
    }
    if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  const missing = contains.filter((needle) => !last?.text?.includes(needle));
  console.error(`FAIL ${method} ${path}`, last?.status || last?.error, missing.length ? { missing } : { expected: expectedStatuses });
  process.exitCode = 1;
}

await check("/", { contains: ["THE LIFESTYLE", "UNIVERSITY"] });

for (const slug of courseSlugs) {
  await check(`/courses/${slug}`, { contains: ["32", "Hakuna Matata", "PROOF BUILD"] });
}

for (const slug of consultationSlugs) {
  await check(`/consultations/${slug}`, { contains: ["STRATEGY ROOM", "Hakuna Matata"] });
}

await check("/consultations/checkout/success", {
  contains: ["STRATEGY ROOM SCHEDULING", "dr-dorsey-strategy-consultation"],
});

// Security posture: anonymous POSTs must not reach protected TLU handlers.
await check("/api/tlu/commerce", { method: "POST", expected: [401, 403] });
await check("/api/tlu/consultations", { method: "POST", expected: [401, 403] });
await check("/api/tlu/lms", { method: "POST", expected: [401, 403] });

if (process.exitCode) process.exit(process.exitCode);
console.log("TLU production smoke suite complete.");
