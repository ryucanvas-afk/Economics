"use client";

import Card from "@/components/ui/Card";
import PriceChange from "@/components/ui/PriceChange";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function BondYields({
  data,
  loading,
}: {
  data?: Record<string, any> | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <Card title="채권 금리" icon="📊">
        <LoadingSkeleton rows={3} />
      </Card>
    );
  }

  const us10y = data.us10y;
  const us2y = data.us2y;

  // 장단기 금리차 (10Y - 2Y)
  const spread = us10y && us2y ? (us10y.price - us2y.price) : null;
  const isInverted = spread !== null && spread < 0;

  return (
    <Card title="채권 금리" icon="📊">
      <div className="space-y-0">
        {Object.entries(data).map(([key, item]: [string, any]) => (
          <div
            key={key}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
          >
            <div>
              <div className="text-xs text-white/80">{item.name}</div>
              <div className="text-[10px] text-muted">{item.sub}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white tabular-nums">
                {item.price?.toFixed(3)}%
              </span>
              <PriceChange value={item.changePercent} size="xs" />
            </div>
          </div>
        ))}
      </div>

      {/* 장단기 금리차 */}
      {spread !== null && (
        <div className={`mt-3 pt-3 border-t border-white/5 rounded-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/80">장단기 금리차</div>
              <div className="text-[10px] text-muted">10Y - 2Y</div>
            </div>
            <div className="text-right">
              <span
                className={`text-sm font-extrabold tabular-nums ${
                  isInverted ? "text-up" : "text-down"
                }`}
              >
                {spread > 0 ? "+" : ""}
                {spread.toFixed(3)}%
              </span>
              {isInverted && (
                <div className="text-[10px] text-up font-semibold mt-0.5">
                  ⚠ 수익률 곡선 역전
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
