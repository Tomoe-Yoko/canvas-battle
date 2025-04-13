"use client";
import { supabase } from "../_utils/supabase";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../_utils/validationSchema";
import { Button } from "../_components/Button";
import { Header } from "../_components/Header";

interface SignUpForm {
  userName: string;
  email: string;
  password: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, //エラーが格納される
    reset,
  } = useForm<SignUpForm>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    const { userName, email, password } = data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { userName },
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });

    if (error) {
      toast("登録に失敗", {
        icon: "😭",
      });
    } else {
      reset(); // フォームの値をリセット
      toast("確認メールを送信したよ", {
        icon: "🎉",
      });
    }
  };

  return (
    <div className=" min-h-screen">
      <Header />
      <h2 className="text-white text-center text-[24px] py-16">ユーザー登録</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[70%] mx-auto p-8 rounded-3xl"
      >
        <div>
          <label htmlFor="userName" className="label-style">
            名前
          </label>
          <input
            id="userName"
            type="userName"
            {...register("userName")}
            placeholder="モンスター"
            className="input-style"
          />
          <p className="validation">
            {errors.userName?.message as React.ReactNode}
          </p>
        </div>
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
            登録
          </Button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default Page;

// youtube:https://www.youtube.com/watch?v=f1fysEKNwQA
//react-hook-form: https://www.react-hook-form.com/get-started#Handleerrors
