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
        const response = await api.get<{ isUser: boolean }>("/api/users");
        if (response.isUser) {
          // 登録済みなら /me へ
          router.replace("/me");
        } else {
          // 新規ユーザーなら何もしない（今のページにとどまる）
          return;
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
