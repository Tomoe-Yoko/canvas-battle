// "use client";

// import useSWR from "swr";
// import type { SWRConfiguration } from "swr";
// import { supabase } from "../_utils/supabase";
// import { api } from "../_utils/api";

// export const useFetch = <T>(path: string, config?: SWRConfiguration) => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
//   const fetcher = async () => {
//     try {
//       if (path === "/auth/user") {
//         const { data, error } = await supabase.auth.getUser();
//         if (error) {
//           console.error("Error:", error.message);
//         }
//         return data.user;
//       }
//       // API 用の fetcher（path !== "/auth/user" の場合）
//       const res = await api.get<{ data: T }>(path);
//       console.log("Fetched data:", res.data); // デバッグ用
//       return res.data;
//     } catch (e) {
//       console.error("API fetch error:", e);
//       throw e;
//     }
//   };
//   const results = useSWR(`${baseUrl}${path}`, fetcher, config);
//   return results;
// };

import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { api } from "../_utils/api";

export const useFetch = <T>(path: string, config?: SWRConfiguration<T>) => {
  const baseUrl = process.env.Next_PUBLIC_API_URL;
  const fetcher = async () => {
    try {
      const response = await api.get<{ data: T }>(path);
      // console.log("Fetched data:", response.data); // デバッグ用
      console.log("Full API response:", response); // APIのレスポンス全体を確認
      console.log("Fetched data:", response.data); // ここが undefined かチェック
      return response.data; // 明示的に .data を返す
    } catch (error) {
      console.error("API fetch error:", error); // エラー詳細を出力
      throw error;
    }
  };

  const results = useSWR(`${baseUrl}${path}`, fetcher, config);
  return results;
};
