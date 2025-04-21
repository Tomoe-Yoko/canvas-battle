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

export const Navigation = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="fixed -bottom-0 -inset-x-0 max-w-[500px] bg-[#a2a5bdee] m-auto py-3">
      <nav className="w-full">
        <ul className="flex justify-around w-11/12 mx-auto">
          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <Link
              href="/me"
              className="flex flex-col items-center gap-1 w-[32px]"
            >
              <FaRegFaceMeh />
              <p className="w-[6rem] text-[0.7rem] text-center">じぶんページ</p>
            </Link>
          </li>

          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <Link
              href="/battle/ready"
              className="flex flex-col items-center gap-1 w-[32px]"
            >
              <FaSpaghettiMonsterFlying />
              <p className="w-[6rem] text-[0.7rem] text-center">じゃんけん</p>
            </Link>
          </li>

          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <Link
              href="/painting"
              className="flex flex-col items-center gap-1 w-[32px]"
            >
              <LuPaintbrushVertical />
              <p className="w-[6rem] text-[0.7rem] text-center">おえかき</p>
            </Link>
          </li>

          <li className="flex flex-col items-center justify-center min-w-[20%] pt-1">
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 w-[32px]"
            >
              <FaPersonWalkingArrowRight />
              <p className="w-[6rem] text-[0.7rem] text-center">おわり</p>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
