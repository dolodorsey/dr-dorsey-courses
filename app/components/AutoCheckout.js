"use client";

import { useEffect, useState } from "react";
import { COMMERCE_FUNCTION, SUPABASE_KEY } from "../lib/tlu";

const SESSION_KEY = "tlu_session";
const GUARD_WINDOW_MS = 120000;

function readSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }
  catch { return null; }
}

export default function AutoCheckout({ productSlug, enabled = false }) {
  const [state, setState] = useState(enabled ? "working" : "idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!enabled || !productSlug) return;
    const session = readSession();
    if (!session?.access_token) return;

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
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "create_checkout",
        product_slug: productSlug,
        origin: window.location.origin
      })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to resume checkout");
        if (!data?.checkout_url) throw new Error("Secure checkout URL was not returned");
        window.location.replace(data.checkout_url);
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
