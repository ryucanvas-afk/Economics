"use client";

// 상승=빨간색, 하락=파란색 (한국 주식 관례)
export default function PriceChange({
  value,
  percentage = true,
  size = "sm",
}: {
  value: number | undefined | null;
  percentage?: boolean;
  size?: "xs" | "sm" | "md";
}) {
  if (value === undefined || value === null) return <span className="text-muted">—</span>;

  const isUp = value > 0;
  const isZero = value === 0;

  const sizeClasses = {
    xs: "text-[10px] px-1 py-0.5",
    sm: "text-[11px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
  };

  if (isZero) {
    return (
      <span className={`${sizeClasses[size]} rounded font-semibold text-muted bg-white/5`}>
        0.00{percentage ? "%" : ""}
      </span>
    );
  }

  return (
    <span
      className={`${sizeClasses[size]} rounded font-semibold ${
        isUp
          ? "text-up bg-up/10"
          : "text-down bg-down/10"
      }`}
    >
      {isUp ? "+" : ""}
      {value.toFixed(2)}
      {percentage ? "%" : ""}
    </span>
  );
}
