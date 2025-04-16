"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-white">
        <Link href="/">
          <Image
            src="/title.png"
            alt="logo"
            width={80}
            height={80}
            className=" object-contain"
          />
        </Link>
      </h1>
      {/* <button className="text-white">logout</button> */}
    </div>
  );
};
