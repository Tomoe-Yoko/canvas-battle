"use client";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-white">
        <Link href="/">
          CANVAS
          <br />
          BATTLE
        </Link>
      </h1>
      {/* <button className="text-white">logout</button> */}
    </div>
  );
};
