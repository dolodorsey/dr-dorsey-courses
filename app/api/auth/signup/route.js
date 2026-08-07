import { exchangeAuth, requestIsSameOrigin } from "../../../lib/serverAuth";

export async function POST(request) {
  if (!requestIsSameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim();
  const password = String(body.password || "");
  const fullName = String(body.full_name || "").trim();
  if (!email || !password || !fullName) return Response.json({ error: "Name, email and password are required" }, { status: 400 });

  const { response, data } = await exchangeAuth("signup", { email, password, data: { full_name: fullName } });
  if (!response.ok) return Response.json({ error: data?.msg || data?.error_description || data?.message || "Profile creation failed" }, { status: response.status });
  return Response.json({ user: data.user, authenticated: Boolean(data.access_token), confirmation_required: !data.access_token });
}
