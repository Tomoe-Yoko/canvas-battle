//リダイレクトカスタムフック
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../_utils/supabase";
import { api } from "../_utils/api";

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const token = session?.access_token;

        if (!token) {
          return;
        }

        // サーバーに「このトークンのユーザーは登録済み？」確認
        const response = await api.get<{ isNewUser: boolean }>("/api/users");

        if (response.isNewUser) {
          // 新規ユーザーなら何もしない（今のページにとどまる）
          console.log("新規ユーザーなので stay on login page");
        } else {
          // 登録済みなら /me へ
          router.replace("/me");
        }
      } catch (error) {
        console.error("認証チェックエラー:", error);
        router.replace("/login");
      }
    };

    checkUserStatus();
  }, [router]);

  return {};
};

// "use client";
// import { useEffect } from "react";

// import { supabase } from "../_utils/supabase";
// import { useRouter } from "next/navigation";

// export const useAuthRedirect = () => {
//   const router = useRouter();
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const { data } = await supabase.auth.getSession();
//         router.replace(data.session ? "/me" : "/login");
//       } catch (error) {
//         console.error("セッション情報取得失敗:", error);
//         router.replace("/login");
//       }
//     };
//     checkSession();
//   }, [router]);

//   return {};
// };
