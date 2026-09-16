import { authenticatedFetch, jsonPassthrough, requestIsSameOrigin } from "../../../lib/serverAuth";
import { CONSULTATIONS_EDGE_FUNCTION, SUPABASE_KEY } from "../../../lib/tlu";

const PUBLIC_ACTIONS = new Set(["submit_application"]);

async function publicFetch(body) {
  return fetch(CONSULTATIONS_EDGE_FUNCTION, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body,
    cache: "no-store"
  });
}

export async function POST(request) {
  if (!requestIsSameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const body = await request.text();
  let action = "";
  try { action = JSON.parse(body || "{}").action || ""; } catch {}

  if (PUBLIC_ACTIONS.has(action)) {
    // Bind to the operator profile when a valid session exists; otherwise allow a public application.
    const authenticated = await authenticatedFetch(CONSULTATIONS_EDGE_FUNCTION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
    if (authenticated.status !== 401) return jsonPassthrough(authenticated);
    return jsonPassthrough(await publicFetch(body));
  }

  const response = await authenticatedFetch(CONSULTATIONS_EDGE_FUNCTION, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  });
  return jsonPassthrough(response);
}
