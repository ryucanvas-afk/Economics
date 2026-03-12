// app/api/fear-greed/route.ts
// CNN Fear & Greed Index (via alternative.me proxy)

import { NextResponse } from "next/server";
import { API_URLS, safeFetch } from "@/lib/api-config";

export async function GET() {
  try {
    const res = await safeFetch(`${API_URLS.fearGreed}/?limit=1&format=json`);
    if (!res) throw new Error("Fear & Greed API failed");

    const data = await res.json();
    const current = data?.data?.[0];

    return NextResponse.json({
      success: true,
      data: {
        value: parseInt(current?.value || "50"),
        classification: current?.value_classification || "Neutral",
        timestamp: current?.timestamp,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, data: null },
      { status: 500 }
    );
  }
}
