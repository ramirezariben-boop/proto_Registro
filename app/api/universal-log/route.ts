import { NextResponse } from "next/server";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwZzR-b41Hw9mR1zKhgT2r8cKW7gXXFMECGSUcnaqhwqT4L0vfwMFF3gNscS47LDqiZ/exec";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const r = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) throw new Error("GAS error");

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, offline: true },
      { status: 200 }
    );
  }
}
