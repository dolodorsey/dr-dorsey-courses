import { accessTokenUserId, getAccessToken, refreshSession, requestIsSameOrigin } from "../../../lib/serverAuth";
import { SUPABASE_KEY, SUPABASE_URL } from "../../../lib/tlu";

function safeFileName(name) {
  return String(name || "evidence").replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120);
}

async function upload(token, path, file) {
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return fetch(`${SUPABASE_URL}/storage/v1/object/tlu-evidence/${encoded}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false"
    },
    body: file,
    cache: "no-store"
  });
}

export async function POST(request) {
  if (!requestIsSameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  let token = await getAccessToken();
  if (!token) return Response.json({ error: "Authentication required" }, { status: 401 });

  const form = await request.formData();
  const assessmentId = String(form.get("assessment_id") || "");
  const file = form.get("file");
  const userId = accessTokenUserId(token);
  if (!assessmentId || !file || typeof file === "string" || !userId) return Response.json({ error: "Assessment and evidence file are required" }, { status: 400 });
  if (file.size > 20 * 1024 * 1024) return Response.json({ error: "Evidence files must be 20 MB or smaller" }, { status: 413 });

  const path = `${userId}/${assessmentId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  let response = await upload(token, path, file);
  if (response.status === 401) {
    token = await refreshSession();
    if (!token) return Response.json({ error: "Authentication required" }, { status: 401 });
    response = await upload(token, path, file);
  }
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    return Response.json({ error: detail?.message || detail?.error || "Evidence upload failed" }, { status: response.status });
  }
  return Response.json({ path });
}
