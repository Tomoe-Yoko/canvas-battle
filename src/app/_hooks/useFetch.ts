// import useSWR from "swr";
// import type { SWRConfiguration } from "swr";
// import { api } from "../_utils/api";

// export const useFetch = <T>(path: string, config?: SWRConfiguration) => {
//   const baseUrl = process.env.Next_PUBLIC_API_URL;
//   const fetcher = async () => {
//     try {
//       const response = await api.get<{ data: { data: T } }>(path);
//       // console.log("Fetched data:", response.data); // デバッグ用
//       console.log("Full API response:", response); // APIのレスポンス全体を確認
//       console.log("Fetched data:", response.data?.data); // ここが undefined かチェック
//       return response.data?.data; // 明示的に .data を返す
//     } catch (error) {
//       console.error("API fetch error:", error); // エラー詳細を出力
//       throw error;
//     }
//   };

//   const results = useSWR<T>(`${baseUrl}${path}`, fetcher, config); // SWR の型も修正
//   // return { ...results, data: results.data?.data };
//   return results;
//   // return results;
// };
// _hooks/useFetch.ts (例)
// _hooks/useFetch.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetch = <T>(url: string) => {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
