// app/api/finnhub/route.ts
// Finnhub — 경제 캘린더, 뉴스, 시장 상태

import { NextResponse } from "next/server";
import { API_URLS, safeFetch } from "@/lib/api-config";

const FINNHUB_KEY = process.env.FINNHUB_API_KEY || "";

async function fetchEconomicCalendar() {
  const today = new Date();
  const from = new Date(today);
  from.setDate(from.getDate() - 7);
  const to = new Date(today);
  to.setDate(to.getDate() + 30);

  const fromStr = from.toISOString().split("T")[0];
  const toStr = to.toISOString().split("T")[0];

  const res = await safeFetch(
    `${API_URLS.finnhub}/calendar/economic?from=${fromStr}&to=${toStr}&token=${FINNHUB_KEY}`
  );

  if (!res) return [];
  const data = await res.json();

  return (data?.economicCalendar || [])
    .filter((e: any) => e.impact === "high" || e.impact === "medium")
    .map((e: any) => ({
      date: e.time || e.date,
      country: e.country,
      event: e.event,
      impact: e.impact === "high" ? "high" : "mid",
      actual: e.actual,
      estimate: e.estimate,
      previous: e.prev,
      unit: e.unit,
    }));
}

async function fetchMarketNews() {
  const res = await safeFetch(
    `${API_URLS.finnhub}/news?category=general&minId=10&token=${FINNHUB_KEY}`
  );

  if (!res) return [];
  const data = await res.json();

  return (data || []).slice(0, 10).map((n: any) => ({
    headline: n.headline,
    summary: n.summary,
    source: n.source,
    url: n.url,
    image: n.image,
    datetime: n.datetime,
    category: n.category,
  }));
}

async function fetchMarketStatus() {
  // 주요 거래소 개장 상태
  const exchanges = ["US", "KS", "T", "HK"];
  const statuses: Record<string, any> = {};

  for (const ex of exchanges) {
    const res = await safeFetch(
      `${API_URLS.finnhub}/stock/market-status?exchange=${ex}&token=${FINNHUB_KEY}`
    );
    if (res) {
      const data = await res.json();
      statuses[ex] = {
        exchange: data.exchange,
        isOpen: data.isOpen,
        session: data.session,
      };
    }
  }

  return statuses;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  try {
    if (!FINNHUB_KEY) {
      return NextResponse.json(
        { success: false, error: "FINNHUB_API_KEY not configured", data: null },
        { status: 500 }
      );
    }

    let data: any = {};

    if (type === "all" || type === "calendar") {
      data.calendar = await fetchEconomicCalendar();
    }
    if (type === "all" || type === "news") {
      data.news = await fetchMarketNews();
    }
    if (type === "all" || type === "status") {
      data.marketStatus = await fetchMarketStatus();
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, data: null },
      { status: 500 }
    );
  }
}
