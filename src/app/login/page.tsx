"use client";
import { useForm } from "react-hook-form";
import { supabase } from "../_utils/supabase";
import React from "react";
import { Button } from "../_components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../_utils/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  // useEffect(() => {
  //   const checkSession = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     if (data?.session) {
  //       router.push("/me");
  //     }
  //   };
  //   checkSession();
  // }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast("ログインに失敗", {
        icon: "😭",
      });
    } else {
      router.push("/me");
      // APIにリクエストを送信する処理
    }
  };

  return (
    <div className=" min-h-screen bg-[#1a1d29]">
      <h2 className="text-white text-center text-[24px] py-16">ユーザー登録</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[70%] mx-auto p-8 rounded-3xl"
      >
        <div>
          <label htmlFor="email" className="label-style">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="name@company.com"
            className="input-style"
          />
          <p className="validation">
            {errors.email?.message as React.ReactNode}
          </p>
        </div>
        <div>
          <label htmlFor="password" className="label-style">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className="input-style"
          />
          <p className="validation">
            {errors.password?.message as React.ReactNode}
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Button type="submit" variant={"submit"}>
            ログイン
          </Button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Page;
