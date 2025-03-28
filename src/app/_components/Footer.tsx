"use client";

import React from "react";
import { FaRegFaceMeh } from "react-icons/fa6";
// import { FaRocket } from "react-icons/fa6";
import { FaSpaghettiMonsterFlying } from "react-icons/fa6";
// import { FaPaintbrush } from "react-icons/fa6";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
// import { IconContext } from "react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../_utils/supabase";
// import { IconContext } from "react-icons";
import { LuPaintbrushVertical } from "react-icons/lu";

export const Footer = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  // return handleLogout;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4">
      <nav className="w-full">
        <ul className="flex justify-around w-full">
          <li className="flex flex-col items-center justify-center gap-2">
            <Link href="/me" className="flex flex-col items-center gap-2">
              <FaRegFaceMeh className="px-6" />
              <p className="w-[6rem] text-[0.9rem] text-center">じぶんページ</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center gap-2">
            <Link href="/battle" className="flex flex-col items-center gap-2">
              {/* <FaRocket /> */}
              <FaSpaghettiMonsterFlying className="px-6" />
              <p className="w-[6rem] text-[0.9rem] text-center">じゃんけん</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center gap-2">
            <Link href="/painting" className="flex flex-col items-center gap-2">
              {/* <FaPaintbrush /> */}
              <LuPaintbrushVertical className="px-6" />
              <p className="w-[6rem] text-[0.9rem] text-center">おえかき</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center gap-2">
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-2"
            >
              <FaPersonWalkingArrowRight className="px-6" />
              <p className="w-[6rem] text-[0.9rem] text-center">おわり</p>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
