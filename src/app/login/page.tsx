"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../_utils/validationSchema";
import { supabase } from "../_utils/supabase";
import { api } from "../_utils/api";
import { useRouter } from "next/navigation";
interface LoginForm {
  userName: string;
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
      if (error) throw new Error(error.message);
      // const token = "your_token_here"; // Replace with actual token retrieval logic
      await api.post("/api/users", { data });
      router.push("/me");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="">
      <h2>ログイン</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">名前</label>
        <input
          id="userName"
          type="text"
          {...register("userName", { required: true })}
        />
        <p className="validation">
          {errors.userName?.message as React.ReactNode}
        </p>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        <p className="validation">{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="password">パスワード</label>
        <input
          id="email"
          type="password"
          {...register("password", { required: true })}
        />
        <p className="validation">
          {errors.password?.message as React.ReactNode}
        </p>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Page;

//
// import { supabase } from "../_utils/supabase";
// import React from "react";
// import { Button } from "../_components/Button";
//
// import { validationSchema } from "../_utils/validationSchema";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// // import { useSupabaseSession } from "../_hooks/useSupabaseSession";
// import { api } from "../_utils/api";
// import { useFetch } from "../_hooks/useFetch";

// const Page = () => {
//   const router = useRouter();

//   const { data: sessionData, error: sessionError } = useFetch<{
//     session?: { access_token?: string };
//   }>("/api/users");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: "onChange",
//     resolver: zodResolver(validationSchema),
//   });
//   const onSubmit = async (data: { email: string; password: string }) => {
//     const { email, password } = data;
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       toast("ログインに失敗", {
//         icon: "😭",
//       });
//       return;
//     }

//     if (sessionData) {
//       const token = sessionData.session?.access_token; // tokenを取得
//       if (token) {
//         await api.post("/api/users", { token }); // tokenを使ったAPIリクエスト
//       }
//       router.push("/me"); // ログイン成功後は"/me"にリダイレクト
//     }
//   };

//   // セッションが取得できているかをチェック
//   if (sessionError) {
//     console.error("Session retrieval failed:", sessionError);
//   }

//   return (
//     <div className=" min-h-screen bg-[#1a1d29]">
//       <h2 className="text-white text-center text-[24px] py-16">ユーザー登録</h2>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white w-[70%] mx-auto p-8 rounded-3xl"
//       >
//         <div>
//           <label htmlFor="email" className="label-style">
//             メールアドレス
//           </label>
//           <input
//             id="email"
//             type="email"
//             {...register("email")}
//             placeholder="name@company.com"
//             className="input-style"
//           />
//           <p className="validation">
//             {errors.email?.message as React.ReactNode}
//           </p>
//         </div>
//         <div>
//           <label htmlFor="password" className="label-style">
//             パスワード
//           </label>
//           <input
//             id="password"
//             type="password"
//             {...register("password")}
//             placeholder="••••••••"
//             className="input-style"
//           />
//           <p className="validation">
//             {errors.password?.message as React.ReactNode}
//           </p>
//         </div>
//         <div className="flex justify-center mt-8">
//           <Button type="submit" variant={"submit"}>
//             ログイン
//           </Button>
//         </div>
//       </form>
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default Page;
