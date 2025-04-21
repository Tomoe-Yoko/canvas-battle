"use client";
import { supabase } from "../_utils/supabase";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../_utils/validationSchema";
import { Button } from "../_components/Button";
import { Header } from "../_components/Header";
import PasswordInput from "../_components/PasswordInput";
import { SignUpForm } from "../_types/users";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, //エラーが格納される
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
        emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/login`,
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
      <h2 className="text-white text-center text-[24px] py-12">ユーザー登録</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[80%]  mx-auto p-8 rounded-3xl"
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <p className="validation">
            {errors.email?.message as React.ReactNode}
          </p>
        </div>
        <div>
          <PasswordInput<SignUpForm>
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            name="password"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit" variant={"submit"} disabled={isSubmitting}>
            登録
          </Button>
        </div>
        <p className="mx-auto mb-4 text-sm  block w-[95%] p-3 text-text_button">
          ※「登録」を押すとメールが送信されます。迷惑メールとして判定される場合がありますので、その際は迷惑メールフォルダをご確認ください。
        </p>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default Page;

// youtube:https://www.youtube.com/watch?v=f1fysEKNwQA
//react-hook-form: https://www.react-hook-form.com/get-started#Handleerrors
