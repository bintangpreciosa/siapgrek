// app/api/sensor/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    suhu: 28.9,
    kelembapan: 47.7,
    cahaya: 1500,
  });
}
