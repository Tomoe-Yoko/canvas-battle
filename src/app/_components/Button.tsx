"use client";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
type Variant =
  | "bg-top"
  | "submit"
  | "bg-blue"
  | "delete"
  | "cancel"
  | "battleOver";

interface Props extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
  variant: Variant;
  children?: ReactNode;
}
export const Button = ({ variant, children, ...props }: Props) => {
  const className = () => {
    switch (variant) {
      case "bg-top":
        return "bg-indigo-700 text-white border-white cursor-pointer";
      case "submit":
        return "bg-[#333] text-white text-[1rem] px-16 py-3 rounded tracking-[0.3rem] hover:bg-[#555] cursor-pointer";
      case "bg-blue":
        return "bg-indigo-700 text-[#fff] max-w-fit text-[1rem] cursor-pointer";
      case "delete":
        return "bg-pink-300 text-[#333] max-w-fit text-[1rem] cursor-pointer";
      case "cancel":
        return "bg-gray-400 text-white px-4 py-2 rounded text-[1rem] cursor-pointer";
      case "battleOver":
        return "mt-8  px-2 py-4 text-2xl bg-yellow-500 text-white rounded hover:bg-yellow-600";
      default:
        return "";
    }
  };
  return (
    <button {...props} className={`rounded p-4 text-2xl ${className()}`}>
      {children}
    </button>
  );
};
