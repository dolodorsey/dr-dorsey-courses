import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DRIVE_VIEW = "https://drive.google.com/file/d/15Y8QEpSLe6redtaf1aDL1gQ8NwYPQHUw/view?usp=drivesdk";
const DRIVE_DOWNLOAD = "https://drive.usercontent.google.com/download?id=15Y8QEpSLe6redtaf1aDL1gQ8NwYPQHUw&export=download";
const DRIVE_UC = "https://drive.google.com/uc?export=download&id=15Y8QEpSLe6redtaf1aDL1gQ8NwYPQHUw";

async function inspect(url) {
  try {
    const r = await fetch(url, { cache: "no-store", redirect: "follow" });
    const buf = await r.arrayBuffer();
    return { status: r.status, ok: r.ok, bytes: buf.byteLength, type: r.headers.get("content-type"), finalUrl: r.url };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

export async function GET() {
  return NextResponse.json({ view: await inspect(DRIVE_VIEW), download: await inspect(DRIVE_DOWNLOAD), uc: await inspect(DRIVE_UC) });
}
