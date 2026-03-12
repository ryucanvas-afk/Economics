# CLAUDE.md - Economics Dashboard Project

## Project Overview

A comprehensive web-based financial dashboard for monitoring global markets at a glance. The application aggregates and displays real-time financial data including stock indices, market news, fear & greed index, cryptocurrency, commodities, and futures.

## Repository Structure

```
Economics/
├── CLAUDE.md          # This file - AI assistant guide
├── README.md          # Project documentation (TODO)
├── package.json       # Node.js dependencies
├── frontend/          # Frontend application (TODO)
├── backend/           # Backend API server (TODO)
└── docs/              # Additional documentation (TODO)
```

## Tech Stack (Planned)

- **Frontend**: React (or Next.js) with TypeScript
- **Backend**: Node.js / Python (FastAPI) for API aggregation
- **Data Sources**: Financial market APIs (Yahoo Finance, CoinGecko, etc.)
- **Styling**: Tailwind CSS or similar utility-first framework

## Key Features (Planned)

1. **Global Stock Indices** — Daily tracking of major world indices (S&P 500, NASDAQ, KOSPI, KOSDAQ, Nikkei, etc.)
2. **Daily Market News** — Aggregated key economic issues and headlines
3. **Stock Screening** — Browse stocks by sector/category
4. **Fear & Greed Index** — Market sentiment indicators
5. **Cryptocurrency** — Major crypto price tracking (BTC, ETH, etc.)
6. **Commodities** — Gold, oil, and other commodity prices
7. **Overnight Futures** — After-hours and pre-market futures data

## Development Guidelines

### Git Workflow

- Use feature branches prefixed with `claude/` for AI-assisted development
- Write clear, descriptive commit messages in English
- Push changes to the designated branch, never directly to `main`

### Code Conventions

- Use **TypeScript** for type safety where applicable
- Follow **ESLint** / **Prettier** defaults for formatting
- Keep components small and focused (single responsibility)
- Use meaningful variable and function names in English
- Comments may be in Korean or English

### Commands

```bash
# Install dependencies (once package.json is set up)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint
npm run lint
```

### API Data Handling

- Cache API responses to avoid rate limits
- Use environment variables (`.env`) for API keys — never commit secrets
- Gracefully handle API failures with fallback/cached data

### File Naming

- Components: `PascalCase.tsx` (e.g., `MarketOverview.tsx`)
- Utilities/helpers: `camelCase.ts` (e.g., `formatCurrency.ts`)
- Styles: co-located with components or in a `styles/` directory
- API routes/services: `camelCase.ts` (e.g., `stockService.ts`)

## For AI Assistants

- The primary user language is **Korean** — respond in Korean when the user writes in Korean
- This is a **new project** being built from scratch
- Focus on practical, working code over over-engineered abstractions
- When suggesting financial data sources, prefer free/freemium APIs
- Keep the UI clean and dashboard-oriented (data density matters)
