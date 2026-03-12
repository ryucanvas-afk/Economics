"use client";

import Card from "@/components/ui/Card";
import PriceChange from "@/components/ui/PriceChange";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const FOREX_FLAGS: Record<string, string> = {
  dxy: "💵",
  usdkrw: "🇰🇷",
  eurusd: "🇪🇺",
  usdjpy: "🇯🇵",
};

export default function ForexRates({
  data,
  loading,
}: {
  data?: Record<string, any> | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <Card title="환율" icon="💱">
        <LoadingSkeleton rows={4} />
      </Card>
    );
  }

  // USD/KRW를 강조 표시
  const usdkrw = data.usdkrw;

  return (
    <Card title="환율" icon="💱">
      {/* 원달러 환율 하이라이트 */}
      {usdkrw && (
        <div className="bg-white/5 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-muted">원/달러 환율</div>
              <div className="text-xl font-extrabold text-white tabular-nums mt-0.5">
                ₩{usdkrw.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <PriceChange value={usdkrw.changePercent} size="md" />
          </div>
        </div>
      )}

      {/* 기타 환율 */}
      <div className="space-y-0">
        {Object.entries(data)
          .filter(([key]) => key !== "usdkrw")
          .map(([key, item]: [string, any]) => (
            <div
              key={key}
              className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{FOREX_FLAGS[key] || "🌐"}</span>
                <div>
                  <div className="text-xs text-white/80">{item.name}</div>
                  <div className="text-[10px] text-muted">{item.sub}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white tabular-nums">
                  {item.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <PriceChange value={item.changePercent} size="xs" />
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
}
