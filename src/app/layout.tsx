import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "NEIS 업무 도우미 - 초등학교 업무담당자용",
  description:
    "초등학교 업무담당자를 위한 NEIS 업무 도우미. 연간일정, 업무가이드, 체크리스트 등을 한눈에 확인하세요.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NEIS도우미",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${notoSansKR.className} antialiased`}>
        <Sidebar />
        <main className="min-h-screen lg:pl-64">
          <div className="px-4 py-6 pt-16 lg:pt-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
