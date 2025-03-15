import type { Metadata } from "next";
// import { Noto_Sans_JP } from "next/font/google";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
// import { useRouteGuard } from "./_hooks/useRouteGuard";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const DotGothic = DotGothic16({
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Canbas Battle",
  description: "お絵描きしたキャラクターでじゃんけんバトル",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useRouteGuard();
  return (
    <html lang="ja">
      <body className={`${DotGothic.className} antialiased bg-[#23293b]`}>
        <div className="max-w-[500px] min-h-svh m-auto border-r border-l border-white">
          {children}
        </div>
      </body>
    </html>
  );
}
