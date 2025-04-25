import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
// import { motion } from "framer-motion";
// import Head from "next/head";
import ClientBackground from "./_components/ClientBackground";

const DotGothic = DotGothic16({
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Canbas Battle",
  description: "お絵描きしたキャラクターでじゃんけんバトル",
  other: {
    viewport: "width=device-width, initial-scale=1, maximum-scale=1.0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${DotGothic.className} antialiased bg-custom-image h-screen overflow-hidden`}
      >
        <ClientBackground />
        <main className="relative max-w-[500px] h-screen mx-auto border-x border-white bg-[#020E37] overflow-y-auto hidden-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}
