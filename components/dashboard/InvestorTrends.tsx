"use client";

import Card from "@/components/ui/Card";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function InvestorTrends({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <Card title="투자자별 동향" icon="👥">
        <LoadingSkeleton rows={3} />
      </Card>
    );
  }

  const investors = [
    { key: "foreign", label: "외국인", emoji: "🌐", data: data.foreign },
    { key: "institution", label: "기관", emoji: "🏛️", data: data.institution },
    { key: "retail", label: "개인", emoji: "👤", data: data.retail },
  ];

  return (
    <Card title="투자자별 동향" icon="👥" headerRight={
      data.date ? <span className="text-[10px] text-muted">{data.date}</span> : null
    }>
      <div className="space-y-2">
        {investors.map(({ key, label, emoji, data: inv }) => {
          if (!inv) return null;
          const amount = inv.amount || 0;
          const isBuy = amount > 0;

          return (
            <div key={key} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">{emoji}</span>
                <span className="text-xs text-white/70">{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarIndicator value={amount} />
                <span
                  className={`text-xs font-bold tabular-nums ${
                    isBuy ? "text-up" : "text-down"
                  }`}
                >
                  {isBuy ? "+" : ""}{amount.toLocaleString()}억
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function BarIndicator({ value }: { value: number }) {
  const absVal = Math.abs(value);
  const maxWidth = 60;
  const width = Math.min(maxWidth, (absVal / 5000) * maxWidth);
  const isBuy = value > 0;

  return (
    <div className="w-[60px] h-2.5 bg-white/5 rounded-full overflow-hidden flex items-center"
         style={{ justifyContent: isBuy ? "flex-start" : "flex-end" }}
    >
      <div
        className={`h-full rounded-full ${isBuy ? "bg-up/60" : "bg-down/60"}`}
        style={{ width: `${width}px` }}
      />
    </div>
  );
}
