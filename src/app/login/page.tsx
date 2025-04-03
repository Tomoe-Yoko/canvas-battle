"use client";
import React from "react";
import { Button } from "../_components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../_utils/validationSchema";
import { supabase } from "../_utils/supabase";
import { api } from "../_utils/api";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
interface LoginForm {
  email: string;
  password: string;
}
const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (data: LoginForm) => {
    try {
      const { email, password } = data;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        if (error.code === "email_not_confirmed") {
          toast.error("メールが未確認です。確認メールを再送しました。");
          await supabase.auth.resend({ type: "signup", email });
          return;
        }
        // ユーザーが見つからない場合のエラーコードを特定して条件分岐
        if (error.message.includes("Invalid credentials")) {
          // 新規ユーザー登録処理を実行
          try {
            await api.post("/api/users", { data });
            router.push("/me");
            toast.success("登録とログインに成功しました！");
            return;
          } catch (registerError) {
            console.error("新規登録失敗:", registerError);
            toast.error("新規登録に失敗しました。");
            return;
          }
        }
        console.error("ログイン失敗:", error);
        toast.error("ログインに失敗しました。", {
          icon: "😭",
        });
        return;
      }
      // ログイン成功（既存ユーザー）
      router.push("/me");
    } catch (error) {
      console.error("Login failed:", error);
      toast("ログインに失敗", {
        icon: "😭",
      });
    }
  };
  return (
    <div className=" min-h-screen bg-[#1a1d29]">
      <h2 className="text-white text-center text-[24px] py-16">ログイン</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[70%] mx-auto p-8 rounded-3xl"
      >
        <label htmlFor="email" className="label-style">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="name@company.com"
          className="input-style"
        />
        <p className="validation">{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="password" className="label-style">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          placeholder="••••••••"
          className="input-style"
        />

        <p className="validation">
          {errors.password?.message as React.ReactNode}
        </p>
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
