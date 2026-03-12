import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "경제 통합 대시보드",
  description: "글로벌 경제 시장을 한눈에 파악하는 대시보드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-sans bg-surface text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
