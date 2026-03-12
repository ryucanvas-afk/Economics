"use client";

import Card from "@/components/ui/Card";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function MarketNews({
  data,
  loading,
}: {
  data?: { news: any[]; calendar: any[] } | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <Card title="경제 뉴스 & 캘린더" icon="📰">
        <LoadingSkeleton rows={5} />
      </Card>
    );
  }

  const { news, calendar } = data;

  return (
    <Card title="경제 뉴스 & 캘린더" icon="📰">
      {/* 경제 캘린더 */}
      {calendar && calendar.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-semibold text-muted mb-2 tracking-wider uppercase">
            주요 경제 일정
          </div>
          <div className="space-y-1.5">
            {calendar.slice(0, 5).map((ev: any, i: number) => (
              <div
                key={i}
                className="flex items-start gap-2 py-1.5 border-b border-white/5 last:border-0"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    ev.impact === "high" ? "bg-up" : "bg-yellow-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/80 truncate">{ev.event}</div>
                  <div className="text-[10px] text-muted flex gap-2 mt-0.5">
                    <span>{ev.date?.split("T")[0]}</span>
                    <span className="text-white/40">|</span>
                    <span>{ev.country}</span>
                    {ev.actual && (
                      <>
                        <span className="text-white/40">|</span>
                        <span>실제: {ev.actual}{ev.unit || ""}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 뉴스 */}
      {news && news.length > 0 && (
        <div>
          <div className="text-[10px] font-semibold text-muted mb-2 tracking-wider uppercase">
            최신 뉴스
          </div>
          <div className="space-y-1.5">
            {news.slice(0, 6).map((item: any, i: number) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1.5 border-b border-white/5 last:border-0 hover:bg-white/5 -mx-1 px-1 rounded transition-colors"
              >
                <div className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {item.headline}
                </div>
                <div className="text-[10px] text-muted mt-0.5 flex gap-2">
                  <span>{item.source}</span>
                  {item.datetime && (
                    <>
                      <span className="text-white/40">|</span>
                      <span>{new Date(item.datetime * 1000).toLocaleDateString("ko-KR")}</span>
                    </>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {(!news || news.length === 0) && (!calendar || calendar.length === 0) && (
        <div className="text-center py-6 text-muted text-xs">
          데이터를 불러올 수 없습니다
        </div>
      )}
    </Card>
  );
}
