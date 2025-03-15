"use client";

import React from "react";
import { GiTargetDummy } from "react-icons/gi";
import { BsRocketTakeoff } from "react-icons/bs";
import { LuPaintbrushVertical } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { supabase } from "../_utils/supabase";

export const Footer = () => {
  // const router = useRouter();
  // const handleLogout = () => {
  //   await supabase.auth.signOut();
  //   router.push("/");
  // };
  // return handleLogout;
  return (
    <div className="flex bg-white">
      <Link href={"/me"}>
        <GiTargetDummy />
      </Link>
      <Link href={"/ready"}>
        <BsRocketTakeoff />
      </Link>
      <Link href={"/painting"}>
        <LuPaintbrushVertical />
      </Link>
      {/* <button onClick={handleLogout}> */}
      <button>
        <AiOutlineLogout />
      </button>
    </div>
  );
};
