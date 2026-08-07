"use client";

import { useEffect, useState } from "react";
import { COMMERCE_FUNCTION } from "../lib/tlu";

const SESSION_KEY = "tlu_session";
const GUARD_WINDOW_MS = 120000;

function hasSafeSessionMarker() {
  try {
    const raw = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!raw) return false;
    if (raw.refresh_token || (raw.access_token && raw.access_token !== "cookie-session")) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return Boolean(raw.authenticated || raw.access_token);
  } catch { return false; }
}

export default function AutoCheckout({ productSlug, enabled = false }) {
  const [state, setState] = useState(enabled ? "working" : "idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!enabled || !productSlug || !hasSafeSessionMarker()) return;
    const guardKey = `tlu_checkout_resume:${productSlug}`;
    const lastAttempt = Number(sessionStorage.getItem(guardKey) || 0);
    if (lastAttempt && Date.now() - lastAttempt < GUARD_WINDOW_MS) {
      setState("idle");
      return;
    }

    sessionStorage.setItem(guardKey, String(Date.now()));
    setState("working");
    fetch(COMMERCE_FUNCTION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create_checkout", product_slug: productSlug, origin: window.location.origin })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          localStorage.removeItem(SESSION_KEY);
          window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}&product=${encodeURIComponent(productSlug)}`;
          return null;
        }
        if (!res.ok) throw new Error(data?.error || "Unable to resume checkout");
        if (!data?.checkout_url) throw new Error("Secure checkout URL was not returned");
        window.location.replace(data.checkout_url);
        return data;
      })
      .catch((error) => {
        sessionStorage.removeItem(guardKey);
        setMessage(error.message);
        setState("error");
      });
  }, [enabled, productSlug]);

  if (state === "working") return <div className="checkout-resume-note"><small>SECURE CHECKOUT</small><span>Resuming your checkout…</span></div>;
  if (state === "error") return <p className="form-error">{message}</p>;
  return null;
}
