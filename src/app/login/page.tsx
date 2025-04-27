"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../_components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../_utils/validationSchema";
import { supabase } from "../_utils/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "../_components/Header";
import PasswordInput from "../_components/PasswordInput";
import { Session } from "@supabase/supabase-js";
import Loading from "../loading";
import { LoginForm } from "../_types/users";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const [session, setSession] = useState<Session | null | undefined>(undefined);
  //  // ログイン状態の確認
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
      } else {
        setSession(null);
      }
    };
    checkSession();
  }, [session]);

  if (session === undefined) {
    return <Loading />;
  }

  if (session) {
    router.replace("/me");
    return <Loading />;
  }

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
        throw new Error(error.message);
      }

      router.push("/me");
    } catch (error) {
      console.error("Login failed:", error);
      toast("ログインに失敗", {
        icon: "😭",
      });
    }
  };

  return (
    <div className=" min-h-screen">
      <Header />
      <h2 className="text-white text-center text-[24px] py-12">ログイン</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[85%] mx-auto p-8 rounded-3xl"
      >
        <div>
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
          <p className="validation">
            {errors.email?.message as React.ReactNode}
          </p>
        </div>
        <div>
          <PasswordInput<LoginForm>
            register={register}
            errors={errors}
            name="password"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit" variant={"submit"} disabled={isSubmitting}>
            ログイン
          </Button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Page;
