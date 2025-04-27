"use client";
import React from "react";
import { motion } from "framer-motion";

export const CatWalk = () => {
  return (
    <div className="w-full h-64 overflow-hidden relative p-8">
      <motion.img
        src="/top-img/neko.png"
        width={300}
        height={300}
        alt="character"
        initial={{ x: "500%" }}
        animate={{
          x: "-130%",
          y: [0, 10, 0, 10, 0], // 上下にゆらゆら
          rotate: [15, 24, 15], // 少し傾く
        }}
        className="absolute top-7 w-2 h-[100px] w-auto"
        transition={{
          x: { duration: 9, repeat: Infinity, ease: "linear", delay: 0 },
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          rotate: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
      />
      <motion.img
        src="/top-img/heart.png"
        width={150}
        height={150}
        alt="character"
        initial={{ x: "800%" }}
        animate={{
          x: "-130%",
          scale: [1, 1.1, 1, 1.1, 1, 1.1, 1, 1.1, 1, 1.1, 1, 1.1, 1],
        }}
        className="absolute top-7 h-24 w-auto "
        transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.img
        src="/top-img/mokumoku.png"
        width={150}
        height={150}
        alt="character"
        initial={{ x: "800%", scale: 0.8 }}
        animate={{
          x: "-130%",
          rotate: [0, 360, 0, 360],
        }}
        className="absolute top-7 h-24 w-auto "
        transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 4 }}
      />
    </div>
  );
};
