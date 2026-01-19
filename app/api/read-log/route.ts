import { NextResponse } from "next/server";

const GAS_URL = "https://script.google.com/macros/s/AKfycbw-Q4dGjqrCy-oiA9FFHHfK7sXD7pp9P31JxMM4qSOLeGZXxp5I7_0baxyLkP0rSTjE/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const r = await fetch(`${GAS_URL}?type=${type}`);
  const data = await r.json();

  return NextResponse.json(data);
}
