// app/api/naver/route.ts
// 네이버 금융 — 한국 시장 특화 데이터 (KOSPI/KOSDAQ, 투자자별 매매동향, 업종)

import { NextResponse } from "next/server";
import { safeFetch } from "@/lib/api-config";

// 네이버 금융 API 엔드포인트들
const NAVER_API = "https://api.finance.naver.com/siseJson.naver";
const NAVER_WORLD = "https://api.stock.naver.com/index";

async function fetchKoreanIndices() {
  try {
    // 네이버 국내 지수 API
    const kospiRes = await safeFetch(
      "https://m.stock.naver.com/api/index/KOSPI/basic"
    );
    const kosdaqRes = await safeFetch(
      "https://m.stock.naver.com/api/index/KOSDAQ/basic"
    );

    const kospi = kospiRes ? await kospiRes.json() : null;
    const kosdaq = kosdaqRes ? await kosdaqRes.json() : null;

    return {
      kospi: kospi ? {
        name: "KOSPI",
        price: parseFloat(kospi.closePrice || kospi.now || "0"),
        change: parseFloat(kospi.compareToPreviousClosePrice || "0"),
        changePercent: parseFloat(kospi.fluctuationsRatio || "0"),
        volume: kospi.accumulatedTradingVolume || "0",
      } : null,
      kosdaq: kosdaq ? {
        name: "KOSDAQ",
        price: parseFloat(kosdaq.closePrice || kosdaq.now || "0"),
        change: parseFloat(kosdaq.compareToPreviousClosePrice || "0"),
        changePercent: parseFloat(kosdaq.fluctuationsRatio || "0"),
        volume: kosdaq.accumulatedTradingVolume || "0",
      } : null,
    };
  } catch (e) {
    console.error("Korean indices fetch failed:", e);
    return { kospi: null, kosdaq: null };
  }
}

async function fetchInvestorTrends() {
  try {
    // 네이버 투자자별 매매동향 API
    const res = await safeFetch(
      "https://m.stock.naver.com/api/index/KOSPI/investorTrendDay"
    );
    if (!res) return null;

    const data = await res.json();
    // data는 날짜별 외국인/기관/개인 순매수 배열
    const latest = data?.[0]; // 가장 최근 데이터

    if (!latest) return null;

    return {
      date: latest.tradeDate || "",
      foreign: {
        label: "외국인",
        net: parseInt(latest.foreignerPureBuyQuant || "0"),
        amount: parseInt(latest.foreignerPureBuyAmt || "0"), // 억원
      },
      institution: {
        label: "기관",
        net: parseInt(latest.organPureBuyQuant || "0"),
        amount: parseInt(latest.organPureBuyAmt || "0"),
      },
      retail: {
        label: "개인",
        net: parseInt(latest.individualPureBuyQuant || "0"),
        amount: parseInt(latest.individualPureBuyAmt || "0"),
      },
    };
  } catch (e) {
    console.error("Investor trends fetch failed:", e);
    return null;
  }
}

async function fetchKoreanSectors() {
  try {
    const res = await safeFetch(
      "https://m.stock.naver.com/api/stocks/up/KOSPI?page=1&pageSize=1"
    );
    // 업종별 데이터는 별도 엔드포인트
    const sectorRes = await safeFetch(
      "https://m.stock.naver.com/api/index/KOSPI/industryGroup"
    );
    if (!sectorRes) return [];

    const data = await sectorRes.json();

    return (data || []).slice(0, 10).map((s: any) => ({
      name: s.industryGroupName || s.name || "",
      change: parseFloat(s.fluctuationsRatio || s.changeRate || "0"),
      price: s.closePrice || "",
    }));
  } catch (e) {
    console.error("Korean sectors fetch failed:", e);
    return [];
  }
}

export async function GET() {
  try {
    const [indices, investors, sectors] = await Promise.all([
      fetchKoreanIndices(),
      fetchInvestorTrends(),
      fetchKoreanSectors(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        indices,
        investors,
        sectors,
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
