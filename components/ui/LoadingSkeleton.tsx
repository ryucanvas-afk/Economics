"use client";

export default function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="skeleton h-3 rounded" style={{ width: `${60 + Math.random() * 40}px` }} />
          <div className="flex gap-2">
            <div className="skeleton h-3 w-16 rounded" />
            <div className="skeleton h-3 w-12 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
