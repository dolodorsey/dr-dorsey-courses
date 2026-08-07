import { authenticatedFetch, jsonPassthrough, requestIsSameOrigin } from "../../../lib/serverAuth";
import { LMS_FUNCTION } from "../../../lib/tlu";

export async function POST(request) {
  if (!requestIsSameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const body = await request.text();
  const response = await authenticatedFetch(LMS_FUNCTION, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  });
  return jsonPassthrough(response);
}
