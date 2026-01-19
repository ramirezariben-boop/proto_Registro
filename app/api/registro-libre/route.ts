import { NextResponse } from "next/server";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwZzR-b41Hw9mR1zKhgT2r8cKW7gXXFMECGSUcnaqhwqT4L0vfwMFF3gNscS47LDqiZ/exec";

export async function POST(req: Request) {
  const body = await req.json();

  await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ ok: true });
}
