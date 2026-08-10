import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const URI = encodeURIComponent("ifs://M/c9721270-d114-4455-8cd0-039e38031de6");
const URLS = {
  raw1200: `https://media.canva.com/v2/image-resize/format:WEBP/quality:85/uri:${URI}/width:1200`,
  raw1672: `https://media.canva.com/v2/image-resize/format:PNG/quality:100/uri:${URI}/width:1672`,
  rawNoResize: `https://media.canva.com/v2/image-resize/format:PNG/quality:100/uri:${URI}`,
};

async function inspect(url) {
  try {
    const r = await fetch(url, { cache: "no-store", redirect: "follow" });
    const buf = await r.arrayBuffer();
    return { status: r.status, ok: r.ok, bytes: buf.byteLength, type: r.headers.get("content-type"), sample: new TextDecoder().decode(buf.slice(0,80)) };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

export async function GET() {
  return NextResponse.json({ raw1200: await inspect(URLS.raw1200), raw1672: await inspect(URLS.raw1672), rawNoResize: await inspect(URLS.rawNoResize) });
}
