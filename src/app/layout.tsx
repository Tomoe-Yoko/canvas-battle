"use client";
// import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
// import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";

const DotGothic = DotGothic16({
  subsets: ["latin-ext"],
  weight: "400",
});

// export const metadata: Metadata = {
//   title: "Canbas Battle",
//   description: "お絵描きしたキャラクターでじゃんけんバトル",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Head>
        <title>Canbas Battle</title>
        <meta name="description" content="todoアプリで快適な生活を" />
        {/* ファビコン関連 */}
        {/* <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <body
        className={`${DotGothic.className} antialiased bg-custom-image h-screen overflow-hidden`}
      >
        <motion.img
          src="/top-img/mokumoku.png"
          width={150}
          height={150}
          alt="topLogo"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 7, -5, 0] }}
          transition={{ duration: 5, repeat: 7 }}
          className="absolute z-[-1] top-24 left-40  "
        />
        <motion.img
          src="/top-img/doro.png"
          width={230}
          height={230}
          alt="topLogo"
          initial={{ y: 0 }}
          animate={{ y: [0, -32, 0] }} // ゆらゆら上下に動く
          transition={{ duration: 3, repeat: 7 }}
          className="absolute z-[-1] bottom-48 left-8"
        />
        <motion.img
          src="/top-img/heart.png"
          width={150}
          height={150}
          alt="topLogo"
          initial={{ scale: 0.95 }}
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 1, repeat: 7 }}
          className="absolute z-[-1] top-16 right-18"
        />
        <motion.img
          src="/top-img/shy.png"
          width={150}
          height={150}
          alt="topLogo"
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }} // ゆらゆら上下に動く
          transition={{ duration: 4, repeat: 7 }}
          className="absolute z-[-1] top-70 right-43"
        />
        <motion.img
          src="/top-img/neko.png"
          width={180}
          height={180}
          alt="topLogo"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: 7 }}
          className="absolute z-[-1] bottom-18 right-8"
        />
        <main className="relative max-w-[500px] h-screen mx-auto border-x border-white bg-[#020E37] overflow-y-auto hidden-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}
