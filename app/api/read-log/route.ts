import { NextResponse } from "next/server";

const GAS_URL = "https://script.google.com/macros/s/AKfycbxNa6X3JcAf3szQfDhv0qZyVSAO_nLO07lPPengLiupEvCzCeJh7QyTqO_Gw4L1s0o7/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const r = await fetch(`${GAS_URL}?type=${type}`);
  const data = await r.json();

  return NextResponse.json(data);
}
