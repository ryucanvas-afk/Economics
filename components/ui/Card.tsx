"use client";

import React from "react";

interface CardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
}

export default function Card({ title, icon, children, className = "", headerRight }: CardProps) {
  return (
    <div className={`bg-surface-card border border-border rounded-2xl p-5 card-hover ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-base">{icon}</span>}
          <h2 className="text-sm font-bold text-white/90 tracking-tight">{title}</h2>
        </div>
        {headerRight}
      </div>
      {children}
    </div>
  );
}
