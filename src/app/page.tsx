"use client";
import Link from "next/link";
import { Button } from "./_components/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { EyeSvg } from "./_components/EyeSvg";

export default function Home() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-indigo-950 via-gray-800 to-blue-950">
      {/* <div className="min-h-svh "> */}
      <div className="w-[41%] mx-auto pt-24">
        <EyeSvg />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300, // バネの硬さ（数値を大きくすると反発が速くなる）
          damping: 11, // 揺れを抑える（低いとビヨンビヨン揺れる）
          duration: 0.6, // オプション（springのときはなくてもOK）
        }}
        className="mt-[-3rem]"
      >
        <Image
          src="/title.png"
          width={300}
          height={300}
          alt="topLogo"
          className="w-4xs mx-auto my-15"
        />
      </motion.div>
      <div className="flex justify-center items-center">
        <div>
          <Link href="/login" className="block">
            <Button variant="bg-top">はじめる</Button>
          </Link>

          <Link href="/signup" className="block mt-8">
            <Button variant="bg-top">新規登録</Button>
          </Link>
        </div>
      </div>

      <footer className="py-6 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="flex items-center mt-4 text-gray-500 text-sm">
          &copy; Canvas Battle
        </p>
      </footer>
    </div>
  );
}
