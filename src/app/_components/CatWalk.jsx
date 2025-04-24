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
          x: "-70%",
          y: [0, -10, 0, 10, 0], // 上下にゆらゆら
          rotate: [0, 10, 45, 10, 0], // 少し傾く
        }}
        className="absolute bottom-50 w-2 h-[100px] w-auto"
        transition={{
          x: { duration: 11, repeat: Infinity, ease: "linear" },
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
        initial={{ x: "1000%" }}
        animate={{ x: "-70%" }}
        className="absolute bottom-50 h-24 w-auto "
        transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
