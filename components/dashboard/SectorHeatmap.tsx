"use client";

import Card from "@/components/ui/Card";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function SectorHeatmap({
  data,
  loading,
}: {
  data?: any[] | null;
  loading: boolean;
}) {
  if (loading || !data || data.length === 0) {
    return (
      <Card title="업종별 현황" icon="🗂️">
        <LoadingSkeleton rows={4} />
      </Card>
    );
  }

  const sorted = [...data].sort((a, b) => (b.change || 0) - (a.change || 0));

  return (
    <Card title="업종별 현황" icon="🗂️">
      <div className="grid grid-cols-2 gap-1.5">
        {sorted.map((sector, i) => {
          const change = sector.change || 0;
          const isUp = change > 0;
          const intensity = Math.min(1, Math.abs(change) / 3);

          return (
            <div
              key={i}
              className="rounded-lg px-2.5 py-2 text-center"
              style={{
                background: isUp
                  ? `rgba(255, 59, 48, ${0.05 + intensity * 0.2})`
                  : change === 0
                  ? "rgba(255,255,255,0.03)"
                  : `rgba(0, 122, 255, ${0.05 + intensity * 0.2})`,
              }}
            >
              <div className="text-[11px] font-medium text-white/70 truncate">
                {sector.name}
              </div>
              <div
                className={`text-xs font-bold tabular-nums mt-0.5 ${
                  isUp ? "text-up" : change === 0 ? "text-muted" : "text-down"
                }`}
              >
                {isUp ? "+" : ""}{change.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
