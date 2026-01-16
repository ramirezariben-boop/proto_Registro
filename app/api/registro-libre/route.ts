import { NextResponse } from "next/server";

const GAS_URL = "https://script.google.com/macros/s/AKfycbxNa6X3JcAf3szQfDhv0qZyVSAO_nLO07lPPengLiupEvCzCeJh7QyTqO_Gw4L1s0o7/exec";

export async function POST(req: Request) {
  const body = await req.json();

  await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ ok: true });
}
