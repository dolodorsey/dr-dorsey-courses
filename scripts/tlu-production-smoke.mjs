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

async function fetchWithRetry(path, { method = "GET", expected = 200, contains = [] } = {}) {
  const url = `${base}${path}`;
  let last = null;
  for (let attempt = 1; attempt <= 12; attempt++) {
    try {
      const res = await fetch(url, { method, redirect: "follow" });
      const text = await res.text();
      last = { status: res.status, text };
      const bodyOk = contains.every((needle) => text.includes(needle));
      if (res.status === expected && bodyOk) {
        console.log(`PASS ${method} ${path} -> ${res.status}`);
        return;
      }
    } catch (error) {
      last = { error: error.message };
    }
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
  console.error(`FAIL ${method} ${path}`, last?.status || last?.error, contains.filter((needle) => !last?.text?.includes(needle)));
  process.exitCode = 1;
}

await fetchWithRetry("/", { contains: ["THE LIFESTYLE", "UNIVERSITY"] });

for (const slug of courseSlugs) {
  await fetchWithRetry(`/courses/${slug}`, { contains: ["32", "Hakuna Matata", "PROOF BUILD"] });
}

for (const slug of consultationSlugs) {
  await fetchWithRetry(`/consultations/${slug}`, { contains: ["STRATEGY ROOM", "Hakuna Matata"] });
}

await fetchWithRetry("/consultations/checkout/success", {
  contains: ["STRATEGY ROOM SCHEDULING", "dr-dorsey-strategy-consultation"],
});

// Security posture: anonymous cross-origin-less POSTs must not reach commerce.
await fetchWithRetry("/api/tlu/commerce", { method: "POST", expected: 403 });
await fetchWithRetry("/api/tlu/consultations", { method: "POST", expected: 403 });
await fetchWithRetry("/api/tlu/lms", { method: "POST", expected: 403 });

if (process.exitCode) process.exit(process.exitCode);
console.log("TLU production smoke suite complete.");
