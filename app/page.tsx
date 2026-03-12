"use client";

import React from "react";
import { useAllMarketData } from "@/lib/use-market-data";

import GlobalIndices from "@/components/dashboard/GlobalIndices";
import FearGreedGauge from "@/components/dashboard/FearGreedGauge";
import CommodityPrices from "@/components/dashboard/CommodityPrices";
import CryptoTracker from "@/components/dashboard/CryptoTracker";
import ForexRates from "@/components/dashboard/ForexRates";
import BondYields from "@/components/dashboard/BondYields";
import MarketNews from "@/components/dashboard/MarketNews";
import InvestorTrends from "@/components/dashboard/InvestorTrends";
import SectorHeatmap from "@/components/dashboard/SectorHeatmap";

export default function Home() {
  const { yahoo, naver, crypto, finnhub, fearGreed, isLoading, refetchAll } =
    useAllMarketData();

  // 전체 로딩
  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-extrabold">
          E
        </div>
        <div className="text-sm font-semibold text-muted">
          시장 데이터를 불러오는 중...
        </div>
        <div className="w-48 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className="w-3/5 h-full rounded-full bg-blue-500 pulse-dot" />
        </div>
      </div>
    );
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-[1400px] mx-auto px-4 py-5 sm:px-6">
        {/* 헤더 */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-extrabold">
              E
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-tight">
                경제 통합 대시보드
              </h1>
              <p className="text-[11px] text-muted mt-0.5">
                실시간 글로벌 시장 데이터
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot" />
              <span className="text-[11px] text-muted">LIVE</span>
            </div>
            <span className="text-[11px] text-muted tabular-nums">{timeStr}</span>
            <button
              onClick={refetchAll}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-white/70 hover:bg-surface-hover hover:text-white transition-colors"
            >
              새로고침
            </button>
          </div>
        </header>

        {/* 대시보드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* 1열: 글로벌 증시 (2행 차지) */}
          <div className="lg:row-span-2">
            <GlobalIndices
              yahooData={yahoo.data}
              naverData={naver.data}
              loading={yahoo.loading}
            />
          </div>

          {/* 2열: 공포탐욕 + 환율 */}
          <div>
            <FearGreedGauge
              data={fearGreed.data}
              vixData={yahoo.data?.sentiment?.vix}
              loading={fearGreed.loading}
            />
          </div>

          <div>
            <ForexRates
              data={yahoo.data?.forex}
              loading={yahoo.loading}
            />
          </div>

          {/* 4열: 투자자 동향 */}
          <div>
            <InvestorTrends
              data={naver.data?.investors}
              loading={naver.loading}
            />
          </div>

          {/* 2행 */}
          <div>
            <CommodityPrices
              data={yahoo.data?.commodities}
              loading={yahoo.loading}
            />
          </div>

          <div>
            <CryptoTracker data={crypto.data} loading={crypto.loading} />
          </div>

          <div>
            <BondYields
              data={yahoo.data?.bonds}
              loading={yahoo.loading}
            />
          </div>

          {/* 3행: 뉴스 & 캘린더, 섹터 */}
          <div className="md:col-span-2">
            <MarketNews
              data={finnhub.data ? { news: finnhub.data.news, calendar: finnhub.data.calendar } : null}
              loading={finnhub.loading}
            />
          </div>

          <div className="md:col-span-2 xl:col-span-2">
            <SectorHeatmap
              data={naver.data?.sectors}
              loading={naver.loading}
            />
          </div>
        </div>

        {/* 푸터 */}
        <footer className="text-center py-8 mt-6 border-t border-white/5">
          <p className="text-[11px] text-muted">
            경제 통합 대시보드 v1.0 — 데이터 출처: Yahoo Finance, 네이버 금융, CoinGecko, Finnhub, Alternative.me
          </p>
        </footer>
      </div>
    </div>
  );
}
