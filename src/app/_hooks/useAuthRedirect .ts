//リダイレクトカスタムフック
"use client";
import { useEffect } from "react";

import { supabase } from "../_utils/supabase";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        router.replace(data.session ? "/me" : "/login");
      } catch (error) {
        console.error("セッション情報取得失敗:", error);
        router.replace("/login");
      }
    };
    checkSession();
  }, [router]);

  return {};
};
