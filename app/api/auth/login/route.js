import { exchangeAuth, requestIsSameOrigin } from "../../../lib/serverAuth";

export async function POST(request) {
  if (!requestIsSameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim();
  const password = String(body.password || "");
  if (!email || !password) return Response.json({ error: "Email and password are required" }, { status: 400 });

  const { response, data } = await exchangeAuth("token?grant_type=password", { email, password });
  if (!response.ok) return Response.json({ error: data?.msg || data?.error_description || data?.message || "Sign in failed" }, { status: response.status });
  return Response.json({ user: data.user, authenticated: true });
}
