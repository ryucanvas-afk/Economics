"use client";

import Card from "@/components/ui/Card";
import PriceChange from "@/components/ui/PriceChange";
import MiniChart from "@/components/ui/MiniChart";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const CRYPTO_ICONS: Record<string, string> = {
  bitcoin: "₿",
  ethereum: "Ξ",
  solana: "◎",
};

export default function CryptoTracker({
  data,
  loading,
}: {
  data?: { coins: any[]; global: any } | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <Card title="암호화폐" icon="₿">
        <LoadingSkeleton rows={4} />
      </Card>
    );
  }

  const { coins, global } = data;

  return (
    <Card title="암호화폐" icon="₿">
      <div className="space-y-0">
        {coins?.map((coin: any) => (
          <div
            key={coin.id}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg w-6 text-center font-bold text-white/60">
                {CRYPTO_ICONS[coin.id] || "●"}
              </span>
              <div>
                <div className="text-xs font-medium text-white/80">{coin.name}</div>
                <div className="text-[10px] text-muted">{coin.sub}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {coin.sparkline?.length > 0 && (
                <MiniChart
                  data={coin.sparkline.slice(-24)}
                  width={60}
                  height={22}
                />
              )}
              <div className="text-right">
                <div className="text-xs font-bold text-white tabular-nums">
                  ${coin.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <PriceChange value={coin.change24h} size="xs" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 글로벌 시장 데이터 */}
      {global && (
        <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px] text-muted">총 시가총액</div>
            <div className="text-xs font-bold text-white tabular-nums">
              ${(global.totalMarketCap / 1e12).toFixed(2)}T
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted">BTC 도미넌스</div>
            <div className="text-xs font-bold text-white tabular-nums">
              {global.btcDominance?.toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
