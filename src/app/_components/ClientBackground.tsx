"use client";
import { motion } from "framer-motion";
import React from "react";

const ClientBackground = () => {
  return (
    <div>
      <motion.img
        src="/top-img/mokumoku.png"
        width={150}
        height={150}
        alt="topLogo"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 7, -5, 0] }}
        transition={{ duration: 5, repeat: 7 }}
        className="absolute  w-[11%] z-[-1] top-24 left-[20%]  "
      />
      <motion.img
        src="/top-img/doro.png"
        width={230}
        height={230}
        alt="topLogo"
        initial={{ y: 0 }}
        animate={{ y: [0, -32, 0] }} // ゆらゆら上下に動く
        transition={{ duration: 3, repeat: 7 }}
        className="absolute  w-[15%] z-[-1] bottom-48 left-8"
      />
      <motion.img
        src="/top-img/heart.png"
        width={150}
        height={150}
        alt="topLogo"
        initial={{ scale: 0.95 }}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 1, repeat: 7 }}
        className="absolute w-[11%] z-[-1] top-16 right-18"
      />
      <motion.img
        src="/top-img/shy.png"
        width={150}
        height={150}
        alt="topLogo"
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }} // ゆらゆら上下に動く
        transition={{ duration: 4, repeat: 7 }}
        className="absolute w-[11%] z-[-1] top-70 right-[24%]"
      />
      <motion.img
        src="/top-img/neko.png"
        width={180}
        height={180}
        alt="topLogo"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 2, repeat: 7 }}
        className="absolute w-[15%] z-[-1] bottom-[11%] right-8"
      />
    </div>
  );
};

export default ClientBackground;
