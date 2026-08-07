import { cookies } from "next/headers";
import { SUPABASE_KEY, SUPABASE_URL } from "./tlu";

const ACCESS_COOKIE = "tlu_access_token";
const REFRESH_COOKIE = "tlu_refresh_token";
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

function cookieOptions(maxAge) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge
  };
}

function decodePayload(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function accessTokenUserId(token) {
  return decodePayload(token)?.sub || null;
}

function tokenIsFresh(token) {
  const exp = Number(decodePayload(token)?.exp || 0);
  return exp > Math.floor(Date.now() / 1000) + 60;
}

export function requestIsSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return origin === new URL(request.url).origin; }
  catch { return false; }
}

export async function persistSession(session) {
  const store = await cookies();
  if (session?.access_token) {
    const expiresIn = Math.max(60, Number(session.expires_in || 3600));
    store.set(ACCESS_COOKIE, session.access_token, cookieOptions(expiresIn));
  }
  if (session?.refresh_token) {
    store.set(REFRESH_COOKIE, session.refresh_token, cookieOptions(REFRESH_MAX_AGE));
  }
}

export async function clearSession() {
  const store = await cookies();
  store.set(ACCESS_COOKIE, "", cookieOptions(0));
  store.set(REFRESH_COOKIE, "", cookieOptions(0));
}

export async function exchangeAuth(path, body) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store"
  });
  const data = await response.json().catch(() => ({}));
  if (response.ok && data?.access_token) await persistSession(data);
  return { response, data };
}

export async function refreshSession() {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return null;
  const { response, data } = await exchangeAuth("token?grant_type=refresh_token", { refresh_token: refreshToken });
  if (!response.ok || !data?.access_token) {
    await clearSession();
    return null;
  }
  return data.access_token;
}

export async function getAccessToken({ forceRefresh = false } = {}) {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;
  if (!forceRefresh && accessToken && tokenIsFresh(accessToken)) return accessToken;
  return refreshSession();
}

export async function authenticatedFetch(url, init = {}) {
  let token = await getAccessToken();
  if (!token) return new Response(JSON.stringify({ error: "Authentication required" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const send = (bearer) => fetch(url, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${bearer}`,
      ...(init.headers || {})
    },
    cache: "no-store"
  });

  let response = await send(token);
  if (response.status === 401) {
    token = await getAccessToken({ forceRefresh: true });
    if (!token) return response;
    response = await send(token);
  }
  return response;
}

export async function jsonPassthrough(response) {
  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: { "Content-Type": response.headers.get("content-type") || "application/json" }
  });
}
