//ログイン状態をチェックするためのカスタムhook

import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../_utils/supabase";

export const useSupabaseSssion = () => {
  // undefind: ログイン状態ロード中, null: ログインしていない, Session: ログインしている
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setToken(session?.access_token || null);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  return { session, token, isLoading };
};

// https://shiftb.dev/courses/react/z3g0nzbra3v#h36ddb5106c
