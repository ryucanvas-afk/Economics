// app/api/yahoo/route.ts
// Yahoo Finance 비공식 API — 서버에서 호출하므로 CORS 문제 없음

import { NextResponse } from "next/server";
import { YAHOO_SYMBOLS, API_URLS, safeFetch } from "@/lib/api-config";

interface YahooQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  shortName: string;
}

export async function GET() {
  try {
    // 모든 심볼을 한 번에 요청
    const allSymbols = [
      ...Object.values(YAHOO_SYMBOLS.indices).map(s => s.symbol),
      ...Object.values(YAHOO_SYMBOLS.commodities).map(s => s.symbol),
      ...Object.values(YAHOO_SYMBOLS.forex).map(s => s.symbol),
      ...Object.values(YAHOO_SYMBOLS.bonds).map(s => s.symbol),
      ...Object.values(YAHOO_SYMBOLS.sentiment).map(s => s.symbol),
    ];

    const symbolStr = allSymbols.join(",");
    const url = `${API_URLS.yahoo}/v7/finance/quote?symbols=${symbolStr}`;

    const res = await safeFetch(url);
    if (!res) throw new Error("Yahoo Finance API failed");

    const data = await res.json();
    const quotes: YahooQuote[] = data?.quoteResponse?.result || [];

    // 심볼 → 키 역매핑
    const symbolToKey: Record<string, { key: string; category: string; meta: any }> = {};
    for (const [cat, entries] of Object.entries(YAHOO_SYMBOLS)) {
      for (const [key, val] of Object.entries(entries)) {
        symbolToKey[val.symbol] = { key, category: cat, meta: val };
      }
    }

    // 응답 구조화
    const result: Record<string, any> = {
      indices: {},
      commodities: {},
      forex: {},
      bonds: {},
      sentiment: {},
    };

    for (const q of quotes) {
      const mapping = symbolToKey[q.symbol];
      if (!mapping) continue;

      const formatted = {
        key: mapping.key,
        name: mapping.meta.name,
        sub: mapping.meta.sub || mapping.meta.region || "",
        price: q.regularMarketPrice,
        change: q.regularMarketChange,
        changePercent: q.regularMarketChangePercent,
        prevClose: q.regularMarketPreviousClose,
        open: q.regularMarketOpen,
        high: q.regularMarketDayHigh,
        low: q.regularMarketDayLow,
        volume: q.regularMarketVolume,
        high52w: q.fiftyTwoWeekHigh,
        low52w: q.fiftyTwoWeekLow,
        yahooName: q.shortName,
      };

      result[mapping.category][mapping.key] = formatted;
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, data: null },
      { status: 500 }
    );
  }
}
