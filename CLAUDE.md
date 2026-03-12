# CLAUDE.md - Economics Dashboard (경제 대시보드)

## Project Overview

한눈에 보는 종합 경제 대시보드. 글로벌 증시, 시장 심리, 원자재, 암호화폐, 환율, 채권, 선물, 경제 뉴스를 실시간으로 집약하여 보여주는 웹 애플리케이션.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14+** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Charts | **Recharts** 또는 **Lightweight Charts** (TradingView) |
| State | React Server Components + `use` / SWR for client-side fetching |
| API | Next.js Route Handlers (`app/api/`) — 별도 백엔드 불필요 |
| Deployment | Vercel (권장) 또는 self-hosted |

## Repository Structure

```
Economics/
├── CLAUDE.md                   # AI 어시스턴트 가이드 (이 파일)
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                  # API 키 (git에 포함 금지)
├── .gitignore
│
├── public/                     # 정적 파일 (아이콘, 이미지)
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 메인 대시보드 페이지
│   │   ├── globals.css         # 글로벌 스타일
│   │   │
│   │   ├── api/                # API Route Handlers
│   │   │   ├── indices/        # 글로벌 증시 데이터
│   │   │   ├── sentiment/      # 공포지수, VIX 등
│   │   │   ├── commodities/    # 금, 유가 등
│   │   │   ├── crypto/         # 암호화폐
│   │   │   ├── forex/          # 환율, 달러인덱스
│   │   │   ├── bonds/          # 국채 금리
│   │   │   ├── futures/        # 야간 선물
│   │   │   ├── news/           # 경제 뉴스
│   │   │   ├── calendar/       # 경제 캘린더
│   │   │   └── sectors/        # 섹터별 분석
│   │   │
│   │   ├── stocks/             # 종목 상세 페이지 (추후)
│   │   └── settings/           # 설정 페이지 (추후)
│   │
│   ├── components/             # React 컴포넌트
│   │   ├── dashboard/          # 대시보드 위젯 컴포넌트
│   │   │   ├── GlobalIndices.tsx
│   │   │   ├── FearGreedGauge.tsx
│   │   │   ├── CommodityPrices.tsx
│   │   │   ├── CryptoTracker.tsx
│   │   │   ├── ForexRates.tsx
│   │   │   ├── BondYields.tsx
│   │   │   ├── FuturesOvernight.tsx
│   │   │   ├── MarketNews.tsx
│   │   │   ├── EconomicCalendar.tsx
│   │   │   └── SectorHeatmap.tsx
│   │   │
│   │   └── ui/                 # 공통 UI 컴포넌트
│   │       ├── Card.tsx
│   │       ├── PriceChange.tsx # 상승/하락 색상 표시
│   │       ├── MiniChart.tsx
│   │       └── LoadingSkeleton.tsx
│   │
│   ├── lib/                    # 유틸리티 & 서비스
│   │   ├── api/                # 외부 API 호출 로직
│   │   │   ├── yahooFinance.ts
│   │   │   ├── coinGecko.ts
│   │   │   ├── fearGreed.ts
│   │   │   └── newsApi.ts
│   │   ├── formatters.ts       # 숫자/날짜 포맷팅
│   │   └── constants.ts        # 상수 (지수 목록, 티커 등)
│   │
│   └── types/                  # TypeScript 타입 정의
│       ├── market.ts
│       ├── crypto.ts
│       └── news.ts
│
└── docs/                       # 추가 문서
```

## Features — 대시보드 위젯 목록

### 1. 글로벌 증시 (Global Indices)
- 한국: KOSPI, KOSDAQ
- 미국: S&P 500, NASDAQ, Dow Jones, Russell 2000
- 유럽: FTSE 100, DAX, CAC 40, Euro Stoxx 50
- 아시아: Nikkei 225, 항셍, 상해종합, 대만 가권지수
- 표시: 현재가, 전일대비 변동(%), 미니 차트

### 2. 시장 심리 지표 (Market Sentiment)
- CNN Fear & Greed Index (게이지 차트)
- VIX 변동성 지수
- Put/Call Ratio
- 신고가/신저가 비율

### 3. 원자재 (Commodities)
- 금 (Gold), 은 (Silver)
- WTI 원유, Brent 원유
- 천연가스
- 구리 (경기 선행지표)

### 4. 암호화폐 (Cryptocurrency)
- BTC, ETH 시세 및 변동
- 비트코인 도미넌스
- 총 암호화폐 시가총액
- 주요 알트코인 (SOL, XRP 등)

### 5. 환율 & 달러 (Forex)
- USD/KRW 원달러 환율
- 달러 인덱스 (DXY)
- EUR/USD, USD/JPY, USD/CNY

### 6. 채권 금리 (Bond Yields)
- 미국 국채: 2년, 10년, 30년 금리
- 장단기 금리차 (10Y - 2Y) — 경기침체 신호
- 한국 국고채 금리

### 7. 야간 선물 (Overnight Futures)
- S&P 500 선물 (ES)
- NASDAQ 100 선물 (NQ)
- KOSPI 200 야간 선물
- 다우 선물 (YM)

### 8. 경제 캘린더 & 뉴스
- FOMC 일정 / 금리 결정
- 고용지표 (비농업 고용, 실업률)
- CPI / PPI (인플레이션)
- GDP 발표
- 주요 경제 뉴스 헤드라인

### 9. 섹터별 분석 (Sector Analysis)
- 업종별 수익률 히트맵
- 시가총액 상위 종목
- 거래량 상위 종목

## Data Sources (무료/Freemium API)

| 데이터 | API | 비고 |
|--------|-----|------|
| 주식/지수 | Yahoo Finance (비공식), Alpha Vantage, Finnhub | Yahoo는 비공식이지만 무료, Alpha Vantage는 키 필요 |
| 공포탐욕지수 | CNN Fear & Greed (비공식), Alternative.me (크립토) | 스크래핑 또는 비공식 API |
| VIX | Yahoo Finance, CBOE | 지수 티커 `^VIX` |
| 원자재 | Yahoo Finance, metals-api.com | 금/은/유가 |
| 암호화폐 | CoinGecko API (무료), CoinMarketCap | CoinGecko 무료 티어 충분 |
| 환율 | ExchangeRate-API, Open Exchange Rates | 무료 티어 존재 |
| 채권 금리 | FRED API (미 연준), Yahoo Finance | FRED는 무료, 키 필요 |
| 선물 | Yahoo Finance, Investing.com (비공식) | 야간 선물 데이터 |
| 뉴스 | NewsAPI, Finnhub News | NewsAPI 무료 티어 제한적 |
| 경제 캘린더 | Finnhub, TradingEconomics | Finnhub 무료 |

## Development Guidelines

### Commands

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 실행
npm start

# 린트 검사
npm run lint

# 타입 체크
npx tsc --noEmit
```

### Git Workflow

- feature branch는 `claude/` 접두사 사용
- 커밋 메시지는 영어로 작성, 명확하고 서술적으로
- `main` 브랜치에 직접 push 금지

### Code Conventions

- **TypeScript strict mode** 사용
- **ESLint** + **Prettier** 기본 설정 준수
- 컴포넌트는 작고 단일 책임 원칙 준수
- 변수/함수명은 영어, 주석은 한국어 또는 영어 가능
- API 키는 반드시 `.env.local`에 저장, 절대 커밋하지 않음

### File Naming

- 컴포넌트: `PascalCase.tsx` (예: `GlobalIndices.tsx`)
- 유틸리티: `camelCase.ts` (예: `formatCurrency.ts`)
- API 라우트: `route.ts` (Next.js App Router 규칙)
- 타입 정의: `camelCase.ts` (예: `market.ts`)

### API Data Handling

- API 응답은 반드시 캐싱 (Next.js `revalidate` 또는 SWR)
- rate limit 방지를 위한 적절한 갱신 주기 설정
- API 실패 시 캐시된 데이터 또는 fallback UI 표시
- 환경 변수(`.env.local`)로 API 키 관리

### UI/UX Principles

- 대시보드 특성상 **정보 밀도** 높게 유지
- 상승은 **빨간색** (한국 주식 관례), 하락은 **파란색**
- 반응형 레이아웃: 모바일에서도 주요 지표 확인 가능
- 다크 모드 기본 (금융 대시보드 관례)
- 데이터 로딩 중 스켈레톤 UI 표시

## Implementation Phases

### Phase 1: 기초 셋업
- Next.js + TypeScript + Tailwind 프로젝트 초기화
- 기본 레이아웃 및 대시보드 그리드 구성
- 공통 UI 컴포넌트 (Card, PriceChange 등)

### Phase 2: 핵심 위젯
- 글로벌 증시 위젯
- 환율 위젯 (원달러)
- 원자재 위젯 (금, 유가)
- 공포탐욕 지수 게이지

### Phase 3: 확장 위젯
- 암호화폐 트래커
- 채권 금리 & 장단기 금리차
- 야간 선물 데이터
- 섹터 히트맵

### Phase 4: 뉴스 & 캘린더
- 경제 뉴스 피드
- 경제 캘린더 (FOMC, 고용지표 등)
- 자동 갱신 & 알림

### Phase 5: 고도화
- 사용자 설정 (위젯 배치 커스터마이징)
- 종목 상세 페이지
- PWA 지원 (모바일 앱처럼 사용)

## For AI Assistants

- 사용자의 기본 언어는 **한국어** — 한국어로 대화할 것
- 금융 데이터 API는 **무료/Freemium** 우선 선택
- 한국 주식 시장 관례: **상승=빨간색, 하락=파란색**
- 대시보드 UI는 정보 밀도를 높게 유지
- 실용적이고 동작하는 코드 우선, 과도한 추상화 지양
- 외부 API 호출 시 에러 핸들링과 캐싱 필수
