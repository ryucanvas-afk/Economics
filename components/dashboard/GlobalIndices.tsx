"use client";

import Card from "@/components/ui/Card";
import PriceChange from "@/components/ui/PriceChange";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

interface IndexData {
  name: string;
  sub?: string;
  price: number;
  change: number;
  changePercent: number;
}

const REGION_LABELS: Record<string, string> = {
  US: "미국",
  EU: "유럽",
  JP: "일본",
  CN: "중국/홍콩",
};

// 지역별 그룹핑
function groupByRegion(indices: Record<string, IndexData & { sub?: string }>) {
  const grouped: Record<string, (IndexData & { key: string })[]> = {};
  for (const [key, val] of Object.entries(indices)) {
    const region = (val as any).sub || "기타";
    if (!grouped[region]) grouped[region] = [];
    grouped[region].push({ ...val, key });
  }
  return grouped;
}

export default function GlobalIndices({
  yahooData,
  naverData,
  loading,
}: {
  yahooData: any;
  naverData: any;
  loading: boolean;
}) {
  if (loading) {
    return (
      <Card title="글로벌 증시" icon="🌍">
        <LoadingSkeleton rows={8} />
      </Card>
    );
  }

  const indices = yahooData?.indices || {};
  const grouped = groupByRegion(indices);

  // 한국 지수를 맨 앞에 추가
  const koreanIndices: (IndexData & { key: string })[] = [];
  if (naverData?.indices?.kospi) {
    koreanIndices.push({ ...naverData.indices.kospi, key: "kospi" });
  }
  if (naverData?.indices?.kosdaq) {
    koreanIndices.push({ ...naverData.indices.kosdaq, key: "kosdaq" });
  }

  return (
    <Card title="글로벌 증시" icon="🌍">
      <div className="space-y-4">
        {/* 한국 */}
        {koreanIndices.length > 0 && (
          <div>
            <div className="text-[10px] font-semibold text-muted mb-2 tracking-wider uppercase">
              한국
            </div>
            {koreanIndices.map((idx) => (
              <IndexRow key={idx.key} data={idx} />
            ))}
          </div>
        )}

        {/* 나머지 지역 */}
        {Object.entries(grouped).map(([region, items]) => (
          <div key={region}>
            <div className="text-[10px] font-semibold text-muted mb-2 tracking-wider uppercase">
              {REGION_LABELS[region] || region}
            </div>
            {items.map((idx) => (
              <IndexRow key={idx.key} data={idx} />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

function IndexRow({ data }: { data: IndexData }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
      <span className="text-xs text-white/70">{data.name}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-white tabular-nums">
          {data.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
        <PriceChange value={data.changePercent} size="xs" />
      </div>
    </div>
  );
}
