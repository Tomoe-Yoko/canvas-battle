import React, { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "bg-333" | "submit";

interface Props extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
  variant: Variant;
  children?: ReactNode;
}
export const Button = ({ variant, children, ...props }: Props) => {
  const className = () => {
    switch (variant) {
      case "bg-333":
        return "bg-[#333] text-white border-white";
      case "submit":
        return "bg-[#333] text-white text-[1rem] px-12 py-2 rounded tracking-[0.3rem] hover:bg-[#555]";

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
