"use client";

import Card from "@/components/ui/Card";
import PriceChange from "@/components/ui/PriceChange";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const COMMODITY_ICONS: Record<string, string> = {
  gold: "🥇",
  silver: "🥈",
  wti: "🛢️",
  brent: "🛢️",
  natgas: "🔥",
  copper: "🔶",
};

export default function CommodityPrices({
  data,
  loading,
}: {
  data?: Record<string, any> | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <Card title="원자재" icon="⛏️">
        <LoadingSkeleton rows={6} />
      </Card>
    );
  }

  return (
    <Card title="원자재" icon="⛏️">
      <div className="space-y-0">
        {Object.entries(data).map(([key, item]: [string, any]) => (
          <div
            key={key}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{COMMODITY_ICONS[key] || "📦"}</span>
              <div>
                <div className="text-xs font-medium text-white/80">{item.name}</div>
                <div className="text-[10px] text-muted">{item.sub}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white tabular-nums">
                ${item.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <PriceChange value={item.changePercent} size="xs" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
