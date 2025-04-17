"use client";
import Link from "next/link";
import { Button } from "./_components/Button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-indigo-900 via-gray-800 to-blue-900">
      {/* タイトルロゴ */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-16"
      >
        <Image
          src="/title.png"
          width={300}
          height={300}
          alt="topLogo"
          className="w-3xs mx-auto my-20"
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
    </div>
  );
}
