"use client";

import Card from "@/components/ui/Card";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

function getGaugeColor(value: number): string {
  if (value <= 25) return "#FF3B30";
  if (value <= 45) return "#FF9500";
  if (value <= 55) return "#FFD60A";
  if (value <= 75) return "#34C759";
  return "#30D158";
}

function getLabel(value: number): string {
  if (value <= 25) return "극단적 공포";
  if (value <= 45) return "공포";
  if (value <= 55) return "중립";
  if (value <= 75) return "탐욕";
  return "극단적 탐욕";
}

export default function FearGreedGauge({
  data,
  vixData,
  loading,
}: {
  data: { value: number; classification: string } | null;
  vixData?: { price: number; changePercent: number } | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <Card title="시장 심리" icon="🧠">
        <LoadingSkeleton rows={3} />
      </Card>
    );
  }

  const value = data.value;
  const color = getGaugeColor(value);
  const label = getLabel(value);

  // 게이지 각도 계산 (0~100 → -90°~90°)
  const angle = ((value / 100) * 180) - 90;

  return (
    <Card title="시장 심리" icon="🧠">
      <div className="flex flex-col items-center">
        {/* 반원 게이지 */}
        <div className="relative w-[180px] h-[100px] mb-2">
          <svg viewBox="0 0 200 110" className="w-full h-full">
            {/* 배경 호 */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#2C2C2E"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* 색상 그라데이션 호 */}
            <defs>
              <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF3B30" />
                <stop offset="25%" stopColor="#FF9500" />
                <stop offset="50%" stopColor="#FFD60A" />
                <stop offset="75%" stopColor="#34C759" />
                <stop offset="100%" stopColor="#30D158" />
              </linearGradient>
            </defs>
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gauge-gradient)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 251.2} 251.2`}
            />
            {/* 바늘 */}
            <line
              x1="100"
              y1="100"
              x2={100 + 60 * Math.cos((angle * Math.PI) / 180)}
              y2={100 - 60 * Math.sin((-angle * Math.PI) / 180)}
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="5" fill={color} />
          </svg>
        </div>

        {/* 수치 */}
        <div className="text-center">
          <div className="text-3xl font-extrabold tabular-nums" style={{ color }}>
            {value}
          </div>
          <div className="text-sm font-semibold text-white/80 mt-0.5">{label}</div>
          <div className="text-[10px] text-muted mt-0.5">
            {data.classification}
          </div>
        </div>

        {/* VIX */}
        {vixData && (
          <div className="mt-4 w-full pt-3 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">VIX 변동성지수</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tabular-nums">
                  {vixData.price?.toFixed(2)}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1 py-0.5 rounded ${
                    vixData.changePercent > 0
                      ? "text-up bg-up/10"
                      : "text-down bg-down/10"
                  }`}
                >
                  {vixData.changePercent > 0 ? "+" : ""}
                  {vixData.changePercent?.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
