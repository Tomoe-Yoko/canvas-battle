//zod
import { z } from "zod";

export const validationSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("メールアドレスの形式で入力してください。"),
  password: z
    .string()
    .nonempty("パスワードは必須です。")
    .min(8, "8文字以上で入力してください"),
});

//npm i zod
//npm i @hookform/resolvers
