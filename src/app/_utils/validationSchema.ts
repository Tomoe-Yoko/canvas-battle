//zod
import { z } from "zod";

// ページごとに書くのが良い
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
