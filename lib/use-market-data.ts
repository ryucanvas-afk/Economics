// lib/use-market-data.ts
// 클라이언트에서 API Routes를 호출하는 React Hook

"use client";

import { useState, useEffect, useCallback } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

// 범용 데이터 fetcher
function useApiData<T>(endpoint: string, intervalMs = 60000) {
  const [state, setState] = useState<FetchState<T>>({
    data: null, loading: true, error: null, lastUpdated: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();

      if (json.success) {
        setState({
          data: json.data,
          loading: false,
          error: null,
          lastUpdated: json.timestamp,
        });
      } else {
        setState(prev => ({
          ...prev, loading: false,
          error: json.error || "Unknown error",
        }));
      }
    } catch (err: any) {
      setState(prev => ({
        ...prev, loading: false,
        error: err.message,
      }));
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, intervalMs);
    return () => clearInterval(timer);
  }, [fetchData, intervalMs]);

  return { ...state, refetch: fetchData };
}

// ── 개별 Hook들 ──

// Yahoo Finance 데이터 (글로벌 지수, 원자재, 환율, 채권, VIX)
export function useYahooData() {
  return useApiData<{
    indices: Record<string, any>;
    commodities: Record<string, any>;
    forex: Record<string, any>;
    bonds: Record<string, any>;
    sentiment: Record<string, any>;
  }>("/api/yahoo", 60000); // 1분마다
}

// 네이버 금융 (한국 시장, 투자자 동향, 섹터)
export function useNaverData() {
  return useApiData<{
    indices: { kospi: any; kosdaq: any };
    investors: any;
    sectors: any[];
  }>("/api/naver", 60000);
}

// CoinGecko (암호화폐)
export function useCryptoData() {
  return useApiData<{
    coins: any[];
    global: any;
  }>("/api/coingecko", 120000); // 2분마다
}

// Finnhub (경제 캘린더, 뉴스)
export function useFinnhubData() {
  return useApiData<{
    calendar: any[];
    news: any[];
    marketStatus: Record<string, any>;
  }>("/api/finnhub", 300000); // 5분마다
}

// Fear & Greed Index
export function useFearGreed() {
  return useApiData<{
    value: number;
    classification: string;
    timestamp: string;
  }>("/api/fear-greed", 600000); // 10분마다
}

// 전체 데이터를 한번에 관리하는 통합 Hook
export function useAllMarketData() {
  const yahoo = useYahooData();
  const naver = useNaverData();
  const crypto = useCryptoData();
  const finnhub = useFinnhubData();
  const fearGreed = useFearGreed();

  const isLoading = yahoo.loading || naver.loading || crypto.loading;
  const hasError = yahoo.error || naver.error || crypto.error;

  return {
    yahoo, naver, crypto, finnhub, fearGreed,
    isLoading, hasError,
    refetchAll: () => {
      yahoo.refetch();
      naver.refetch();
      crypto.refetch();
      finnhub.refetch();
      fearGreed.refetch();
    },
  };
}
