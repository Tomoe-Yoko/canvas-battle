import React, { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "bg-333" | "submit" | "bg-blue" | "delete" | "cancel";

interface Props extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
  variant: Variant;
  children?: ReactNode;
}
export const Button = ({ variant, children, ...props }: Props) => {
  const className = () => {
    switch (variant) {
      case "bg-333":
        return "bg-[#333] text-white border-white cursor-pointer";
      case "submit":
        return "bg-[#333] text-white text-[1rem] px-12 py-2 rounded tracking-[0.3rem] hover:bg-[#555] cursor-pointer";
      case "bg-blue":
        return "bg-blue-300 text-[#333] max-w-fit text-[1rem] cursor-pointer";
      case "delete":
        return "bg-pink-300 text-[#333] max-w-fit text-[1rem] cursor-pointer";
      case "cancel":
        return "bg-gray-400 text-white px-4 py-2 rounded text-[1rem] cursor-pointer";

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
