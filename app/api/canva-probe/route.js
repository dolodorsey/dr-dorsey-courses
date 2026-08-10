import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const THUMB = "https://media.canva.com/v2/image-resize/format:PNG/height:112/quality:100/uri:ifs%3A%2F%2FM%2Fc9721270-d114-4455-8cd0-039e38031de6/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAA6mctu9ZFUByRKQYY68_igfGpvc6146ixcuMMv224rQ&exp=1786364051&osig=AAAAAAAAAAAAAAAAAAAAALP9FO7_4OjvXGlnDDfEb94mGPS_N9EP4PhqQ_baPkiT&signer=media-rpc&x-canva-quality=thumbnail";
const FULL = THUMB.replace("height:112", "height:941").replace("width:200", "width:1672");

async function inspect(url) {
  try {
    const r = await fetch(url, { cache: "no-store" });
    const buf = await r.arrayBuffer();
    return { status: r.status, ok: r.ok, bytes: buf.byteLength, type: r.headers.get("content-type") };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

export async function GET() {
  return NextResponse.json({ thumb: await inspect(THUMB), full: await inspect(FULL) });
}
