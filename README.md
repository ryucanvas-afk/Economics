# 경제 통합 대시보드 (Economic Dashboard)

초보자도 한 화면에서 글로벌 경제 시장을 직관적으로 이해할 수 있는 대시보드입니다.

## 데이터 소스

| 소스 | 데이터 | API Key |
|------|--------|---------|
| Yahoo Finance | 글로벌 지수, 원자재, 환율, 채권 | 불필요 |
| 네이버 금융 | KOSPI/KOSDAQ, 투자자별 매매동향, 섹터 | 불필요 |
| CoinGecko | 암호화폐 시세, 시가총액, 도미넌스 | 불필요 |
| Finnhub | 경제 캘린더, 뉴스, 시장 상태 | **필요** (무료) |
| alternative.me | 공포&탐욕 지수 | 불필요 |

## 시작하기

### 1. 프로젝트 클론
```bash
git clone <repo-url>
cd econ-dashboard
npm install
```

### 2. 환경 변수 설정
```bash
cp .env.example .env.local
```

`.env.local` 파일을 열고 Finnhub API key를 입력:
```
FINNHUB_API_KEY=your_key_here
```

> Finnhub 무료 API key: https://finnhub.io 에서 가입 후 Dashboard에서 복사

### 3. 개발 서버 실행
```bash
npm run dev
```
http://localhost:3000 에서 확인

### 4. Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포 (첫 실행 시 프로젝트 설정)
vercel

# 프로덕션 배포
vercel --prod
```

Vercel 대시보드에서 Settings > Environment Variables에 `FINNHUB_API_KEY`를 추가하세요.

## 프로젝트 구조

```
econ-dashboard/
├── app/
│   ├── api/                    # 서버사이드 API Routes
│   │   ├── yahoo/route.ts      # Yahoo Finance (지수, 원자재, 환율)
│   │   ├── naver/route.ts      # 네이버 금융 (한국 시장)
│   │   ├── coingecko/route.ts  # CoinGecko (암호화폐)
│   │   ├── finnhub/route.ts    # Finnhub (캘린더, 뉴스)
│   │   └── fear-greed/route.ts # 공포&탐욕 지수
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 대시보드 페이지
├── components/                 # UI 컴포넌트
│   ├── Briefing.tsx            # 브리핑 뷰
│   ├── Dashboard.tsx           # 대시보드 뷰
│   ├── Calendar.tsx            # 캘린더 뷰
│   └── ui/                     # 공통 UI (Glass, Badge, Gauge 등)
├── lib/
│   ├── api-config.ts           # API 설정, 심볼 매핑
│   └── use-market-data.ts      # 클라이언트 데이터 Hook
├── .env.example                # 환경 변수 템플릿
├── package.json
└── next.config.js
```

## API Routes 요약

모든 API는 `/api/*` 경로에서 서버사이드로 실행되므로 CORS 문제가 없습니다.

| 엔드포인트 | 갱신 주기 | 반환 데이터 |
|-----------|----------|------------|
| `GET /api/yahoo` | 1분 | 글로벌 지수, 원자재, 환율, 채권, VIX |
| `GET /api/naver` | 1분 | KOSPI/KOSDAQ, 투자자 동향, 업종 |
| `GET /api/coingecko` | 2분 | BTC/ETH/SOL 시세, 글로벌 시가총액 |
| `GET /api/finnhub` | 5분 | 경제 캘린더, 뉴스, 거래소 상태 |
| `GET /api/fear-greed` | 10분 | 공포&탐욕 지수 |

## 외부 접속 및 원격 테스트

> **중요**: 이 프로젝트는 회사, 카페, 모바일 등 어디서든 접속 가능해야 합니다.

### Vercel 배포 후 (권장)

Vercel에 배포하면 `https://your-project.vercel.app` 주소가 발급됩니다.
이 URL로 어떤 네트워크, 어떤 기기에서든 접속 가능합니다.

```bash
# 프로덕션 배포 — 이 명령 하나로 끝
vercel --prod
```

배포 후 확인:
- PC 브라우저에서 접속 확인
- 모바일 브라우저에서 접속 확인 (같은 URL)
- 회사/카페 등 다른 네트워크에서 접속 확인
- API 응답이 정상인지 `https://your-project.vercel.app/api/yahoo` 직접 호출하여 JSON 확인

### 로컬 개발 시 외부 접속 (개발 단계)

로컬에서 개발 중일 때 외부 기기(모바일 등)에서 테스트하려면:

```bash
# 같은 Wi-Fi 내 다른 기기에서 접속 가능하도록 실행
npm run dev -- -H 0.0.0.0

# 터미널에 표시되는 Network URL (예: http://192.168.0.10:3000)로 접속
```

같은 Wi-Fi가 아닌 완전한 외부 네트워크에서 테스트하려면:
```bash
# ngrok 사용 (무료)
npx ngrok http 3000
# → https://xxxx.ngrok.io 주소로 어디서든 접속 가능
```

### API 엔드포인트 테스트 체크리스트

배포 후 아래 URL을 모두 브라우저에서 열어 JSON 응답이 오는지 확인:

```
✅ /api/yahoo       → indices, commodities, forex 데이터 확인
✅ /api/naver       → kospi, kosdaq, investors 데이터 확인
✅ /api/coingecko   → coins, global 데이터 확인
✅ /api/finnhub     → calendar, news 데이터 확인
✅ /api/fear-greed  → value, classification 데이터 확인
```

하나라도 `{ "success": false }` 가 나오면:
1. Vercel 환경변수에 `FINNHUB_API_KEY`가 설정되어 있는지 확인
2. Vercel Dashboard > Deployments > 해당 배포의 Function Logs에서 에러 확인
3. 외부 API 서비스 자체가 다운되었는지 각 API 사이트에서 확인

### 모바일 반응형 확인

대시보드는 모바일에서도 사용 가능해야 합니다:
- 그리드 레이아웃이 1열로 정렬되는지
- 터치로 탭 전환이 되는지
- 캘린더 날짜 터치가 되는지
- 텍스트가 잘리지 않는지

## 개발 규칙

### 환경 변수
- `.env.local`은 절대 커밋하지 않음 (`.gitignore`에 포함됨)
- API key는 Vercel Dashboard에서만 관리
- 새로운 API key 추가 시 `.env.example`에 변수명만 기록

### 브랜치 전략
- `main` — 안정 버전, Vercel 프로덕션 자동 배포
- `dev` — 개발 중, Vercel Preview 자동 배포
- 기능 추가 시 `feature/기능명` 브랜치에서 작업 후 `dev`로 PR

### 커밋 메시지 규칙
```
feat: 새 기능 추가
fix: 버그 수정
style: UI/디자인 변경
data: API 연동/데이터 관련
docs: 문서 수정
```

### 테스트
- 로컬에서 `npm run dev`로 모든 API 정상 응답 확인 후 push
- Vercel Preview 배포에서 외부 접속 테스트 후 프로덕션 배포
- 최소 2개 이상의 네트워크(집/회사/모바일 데이터)에서 접속 확인

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **호스팅**: Vercel (무료 tier)
- **차트**: Recharts
- **스타일**: Tailwind CSS
- **폰트**: Pretendard
- **데이터**: Yahoo Finance + 네이버 금융 + CoinGecko + Finnhub + alternative.me
