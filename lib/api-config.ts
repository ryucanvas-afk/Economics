// lib/api-config.ts
// 각 API 소스별 설정 및 심볼 매핑

export const YAHOO_SYMBOLS = {
  // 글로벌 주가지수
  indices: {
    "sp500":   { symbol: "^GSPC",   name: "S&P 500",       region: "US" },
    "nasdaq":  { symbol: "^IXIC",   name: "NASDAQ",        region: "US" },
    "dow":     { symbol: "^DJI",    name: "다우존스",       region: "US" },
    "russell": { symbol: "^RUT",    name: "Russell 2000",  region: "US" },
    "nikkei":  { symbol: "^N225",   name: "Nikkei 225",    region: "JP" },
    "stoxx":   { symbol: "^STOXX50E", name: "Euro Stoxx 50", region: "EU" },
    "dax":     { symbol: "^GDAXI",  name: "DAX",           region: "EU" },
    "ftse":    { symbol: "^FTSE",   name: "FTSE 100",      region: "EU" },
    "hsi":     { symbol: "^HSI",    name: "항셍지수",       region: "CN" },
    "shanghai":{ symbol: "000001.SS", name: "상해종합",     region: "CN" },
  },
  // 원자재
  commodities: {
    "gold":    { symbol: "GC=F",    name: "금",     sub: "Gold" },
    "silver":  { symbol: "SI=F",    name: "은",     sub: "Silver" },
    "wti":     { symbol: "CL=F",    name: "WTI 원유", sub: "Crude Oil" },
    "brent":   { symbol: "BZ=F",    name: "브렌트",  sub: "Brent" },
    "natgas":  { symbol: "NG=F",    name: "천연가스", sub: "Natural Gas" },
    "copper":  { symbol: "HG=F",    name: "구리",    sub: "Copper" },
  },
  // 환율
  forex: {
    "dxy":     { symbol: "DX-Y.NYB", name: "달러인덱스", sub: "DXY" },
    "usdkrw":  { symbol: "KRW=X",    name: "원/달러",   sub: "USD/KRW" },
    "eurusd":  { symbol: "EURUSD=X",  name: "EUR/USD",  sub: "EUR/USD" },
    "usdjpy":  { symbol: "JPY=X",     name: "USD/JPY",  sub: "USD/JPY" },
  },
  // 채권 금리
  bonds: {
    "us10y":   { symbol: "^TNX",    name: "미국 10년채", sub: "US 10Y" },
    "us2y":    { symbol: "^IRX",    name: "미국 2년채",  sub: "US 2Y" },
  },
  // VIX
  sentiment: {
    "vix":     { symbol: "^VIX",    name: "VIX",        sub: "변동성지수" },
  },
};

// 네이버 금융에서 가져올 한국 시장 데이터
export const NAVER_SYMBOLS = {
  indices: {
    "kospi":   { code: "KOSPI",  name: "KOSPI" },
    "kosdaq":  { code: "KOSDAQ", name: "KOSDAQ" },
  },
  // 투자자별 매매동향용 — 코스피/코스닥 시장 코드
  investorCodes: {
    "kospi":  "01",
    "kosdaq": "02",
  },
  // 섹터별 업종 코드 (네이버 증권 업종 페이지)
  sectors: [
    { code: "KPI2561", name: "반도체" },
    { code: "KPI2541", name: "IT" },
    { code: "KPI2581", name: "바이오" },
    { code: "KPI2551", name: "자동차" },
    { code: "KPI2531", name: "금융" },
    { code: "KPI2571", name: "화학" },
    { code: "KPI2521", name: "철강" },
    { code: "KPI2511", name: "건설" },
  ],
};

// CoinGecko 설정
export const COINGECKO_IDS = {
  "bitcoin":  { id: "bitcoin",  name: "비트코인", sub: "BTC" },
  "ethereum": { id: "ethereum", name: "이더리움", sub: "ETH" },
  "solana":   { id: "solana",   name: "솔라나",   sub: "SOL" },
};

// API 기본 URL
export const API_URLS = {
  yahoo: "https://query1.finance.yahoo.com",
  naver: "https://finance.naver.com",
  naverApi: "https://api.finance.naver.com",
  coingecko: "https://api.coingecko.com/api/v3",
  finnhub: "https://finnhub.io/api/v1",
  fearGreed: "https://api.alternative.me/fng",
};

// 공통 fetch 헬퍼 (서버 사이드에서 사용)
export async function safeFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; EconDashboard/1.0)",
        ...options?.headers,
      },
      next: { revalidate: 60 }, // 60초 캐시
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } catch (error) {
    console.error(`Fetch failed: ${url}`, error);
    return null;
  }
}
