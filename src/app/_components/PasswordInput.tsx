"use client";

import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

interface PasswordInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isSubmitting?: boolean;
  name: Path<T>;
}

const PasswordInput = <T extends FieldValues>({
  register,
  errors,
  isSubmitting = false,
  name,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor="password" className="label-style">
        パスワード
      </label>
      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          placeholder="••••••••"
          className="input-style"
          disabled={isSubmitting}
        />
        <div
          className="absolute right-2 top-3 transform-translate-y-1/2 cursor-pointer bg-white z-10 px-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
        </div>
      </div>
      <p className="validation">{errors[name]?.message as React.ReactNode}</p>
    </div>
  );
};

export default PasswordInput;
