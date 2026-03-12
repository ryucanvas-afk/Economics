// app/api/coingecko/route.ts
// CoinGecko — 암호화폐 시장 데이터

import { NextResponse } from "next/server";
import { API_URLS, COINGECKO_IDS, safeFetch } from "@/lib/api-config";

export async function GET() {
  try {
    const ids = Object.values(COINGECKO_IDS).map(c => c.id).join(",");

    // 시세 + 시장 데이터
    const priceRes = await safeFetch(
      `${API_URLS.coingecko}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=1h,24h,7d`
    );

    // 글로벌 시장 데이터 (총 시가총액, BTC 도미넌스 등)
    const globalRes = await safeFetch(
      `${API_URLS.coingecko}/global`
    );

    const prices = priceRes ? await priceRes.json() : [];
    const global = globalRes ? await globalRes.json() : null;

    const coins = prices.map((coin: any) => ({
      id: coin.id,
      name: COINGECKO_IDS[coin.id as keyof typeof COINGECKO_IDS]?.name || coin.name,
      sub: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      change7d: coin.price_change_percentage_7d_in_currency,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
      sparkline: coin.sparkline_in_7d?.price || [],
    }));

    const globalData = global?.data ? {
      totalMarketCap: global.data.total_market_cap?.usd || 0,
      totalVolume: global.data.total_volume?.usd || 0,
      btcDominance: global.data.market_cap_percentage?.btc || 0,
      ethDominance: global.data.market_cap_percentage?.eth || 0,
      marketCapChange24h: global.data.market_cap_change_percentage_24h_usd || 0,
    } : null;

    return NextResponse.json({
      success: true,
      data: { coins, global: globalData },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, data: null },
      { status: 500 }
    );
  }
}
