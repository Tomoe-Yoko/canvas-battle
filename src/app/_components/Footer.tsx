"use client";

import React from "react";
import { GiTargetDummy } from "react-icons/gi";
import { BsRocketTakeoff } from "react-icons/bs";
import { LuPaintbrushVertical } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
export const Footer = () => {
  return (
    <div className="flex bg-white">
      <button>
        <GiTargetDummy />
      </button>
      <button>
        <BsRocketTakeoff />
      </button>
      <button>
        <LuPaintbrushVertical />
      </button>
      <button>
        <AiOutlineLogout />
      </button>
    </div>
  );
};
