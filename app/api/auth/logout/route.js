import { clearSession, getAccessToken, requestIsSameOrigin } from "../../../lib/serverAuth";
import { SUPABASE_KEY, SUPABASE_URL } from "../../../lib/tlu";

export async function POST(request) {
  if (!requestIsSameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const token = await getAccessToken();
  if (token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store"
    }).catch(() => null);
  }
  await clearSession();
  return Response.json({ authenticated: false });
}
