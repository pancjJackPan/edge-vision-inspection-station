import { NextResponse } from "next/server";
import { hourlyYield, inspectionFrames, stationHealth } from "@/lib/inspection-data";

export async function GET() {
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    stationHealth,
    frames: inspectionFrames,
    hourlyYield
  });
}
