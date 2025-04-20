"use client";

import React from "react";
import { FaRegFaceMeh } from "react-icons/fa6";
// import { FaRocket } from "react-icons/fa6";
import { FaSpaghettiMonsterFlying } from "react-icons/fa6";
// import { FaPaintbrush } from "react-icons/fa6";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../_utils/supabase";
import { LuPaintbrushVertical } from "react-icons/lu";

export const Footer = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white pb-4">
      <nav className="w-full">
        <ul className="flex justify-around w-full max-h-2/12">
          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <Link href="/me" className="flex flex-col items-center gap-1">
              <FaRegFaceMeh className="px-6" />
              <p className="w-[6rem] text-[0.7rem] text-center">じぶんページ</p>
            </Link>
          </li>

          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <Link
              href="/battle/ready"
              className="flex flex-col items-center gap-1"
            >
              <FaSpaghettiMonsterFlying className="px-6 w-[6rem]" />
              <p className="w-[6rem] text-[0.7rem] text-center">じゃんけん</p>
            </Link>
          </li>

          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <Link href="/painting" className="flex flex-col items-center gap-1">
              <LuPaintbrushVertical className="px-6" />
              <p className="w-[6rem] text-[0.7rem] text-center">おえかき</p>
            </Link>
          </li>

          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1"
            >
              <FaPersonWalkingArrowRight className="px-6" />
              <p className="w-[6rem] text-[0.7rem] text-center">おわり</p>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
