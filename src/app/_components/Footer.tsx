"use client";

import React from "react";
import { GiTargetDummy } from "react-icons/gi";
import { BsRocketTakeoff } from "react-icons/bs";
import { LuPaintbrushVertical } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
// import { IconContext } from "react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../_utils/supabase";

export const Footer = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  // return handleLogout;
  return (
    <div className="flex bg-white justify-around p-4">
      {/* <IconContext.Provider value={{ color: "#ccc", size: "80px" }}> */}
      <Link href={"/me"}>
        <GiTargetDummy size={80} color="#ccc" />
        <p>じぶんページ</p>
      </Link>
      <Link href={"/ready"}>
        <BsRocketTakeoff size={80} color="#ccc" />
      </Link>
      <Link href={"/painting"}>
        <LuPaintbrushVertical size={80} color="#ccc" />
      </Link>
      {/* <button> */}
      <button onClick={handleLogout}>
        <AiOutlineLogout size={80} color="#ccc" />
      </button>
      {/* </IconContext.Provider> */}
    </div>
  );
};
