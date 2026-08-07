"use client";

export default function OperatorLogout() {
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    try { localStorage.removeItem("tlu_session"); } catch {}
    window.location.href = "/login";
  }
  return <button className="console-link operator-logout" onClick={signOut}>Sign out</button>;
}
