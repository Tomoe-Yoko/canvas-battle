//zod
import { z } from "zod";

// export const validationSchema = z.object({
//   userName: z.string().optional(), // userName をオプショナルに設定
//   email: z
//     .string()
//     .nonempty("メールアドレスは必須です。")
//     .email("メールアドレスの形式で入力してください。"),
//   password: z
//     .string()
//     .nonempty("パスワードは必須です。")
//     .min(8, "8文字以上で入力してください"),
// });
// サインアップ用
export const signUpSchema = z.object({
  userName: z.string().min(1, "名前は必須です"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("メール形式が正しくありません"),
  password: z
    .string()
    .nonempty("パスワードは必須です。")
    .min(6, "6文字以上にしてください"),
});
// ログイン用
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("メール形式が正しくありません"),
  password: z
    .string()
    .nonempty("パスワードは必須です。")
    .min(6, "6文字以上にしてください"),
});

//npm i zod
//npm i @hookform/resolvers
