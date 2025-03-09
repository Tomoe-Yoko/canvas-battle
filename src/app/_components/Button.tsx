import React, { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "bg-333" | "text-red";

interface Props extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
  variant: Variant;
  children?: ReactNode;
}
export const Button = ({ variant, children, ...props }: Props) => {
  const className = () => {
    switch (variant) {
      case "bg-333":
        return "bg-[#333] text-white border-white";
      case "text-red":
        return "text-red-500";

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
