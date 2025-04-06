// //ログイン状態をチェックするためのカスタムhook
// import { Session } from "@supabase/supabase-js";
// import { useEffect, useState } from "react";
// import { supabase } from "../_utils/supabase";

// export const useSupabaseSession = () => {
//   const [session, setSession] = useState<Session | null | undefined>(undefined);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetcher = async () => {
//       const { data, error } = await supabase.auth.getSession();

//       if (error) {
//         console.error("セッション取得エラー:", error.message);
//       }

//       setSession(data.session || null);
//       setToken(
//         data.session?.access_token || data.session?.provider_token || null
//       );
//       setIsLoading(false);
//     };

//     fetcher();

//     // セッションの変更を監視
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (_, session) => {
//         setSession(session);
//         setToken(session?.access_token || session?.provider_token || null);
//       }
//     );

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   return { session, token, isLoading };
// };

import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../_utils/supabase";

export const useSupabaseSession = () => {
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
      setToken(session?.access_token || session?.provider_token || null);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  return { session, token, isLoading };
};

// https://shiftb.dev/courses/react/z3g0nzbra3v#h36ddb5106c
