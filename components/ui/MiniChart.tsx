"use client";

// SVG 기반 미니 스파크라인 차트
export default function MiniChart({
  data,
  width = 80,
  height = 28,
  color,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const isUp = data[data.length - 1] >= data[0];
  const strokeColor = color || (isUp ? "#FF3B30" : "#007AFF");

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const gradientId = `grad-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg width={width} height={height} className="flex-shrink-0">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M${points.join(" L")} L${width},${height} L0,${height} Z`}
        fill={`url(#${gradientId})`}
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
