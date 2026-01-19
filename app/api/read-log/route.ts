import { NextResponse } from "next/server";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwZzR-b41Hw9mR1zKhgT2r8cKW7gXXFMECGSUcnaqhwqT4L0vfwMFF3gNscS47LDqiZ/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const r = await fetch(`${GAS_URL}?type=${type}`);
  const data = await r.json();

  return NextResponse.json(data);
}
