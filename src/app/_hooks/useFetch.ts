import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { api } from "../_utils/api";

export const useFetch = <T>(path: string, config?: SWRConfiguration) => {
  const baseUrl = process.env.Next_PUBLIC_API_URL;
  const fetcher = async () => {
    try {
      const response = await api.get<T>(path);
      // console.log("Fetched data:", response.data); // デバッグ用
      console.log("Full API response:", response); // APIのレスポンス全体を確認
      return response;
    } catch (error) {
      console.error("API fetch error:", error); // エラー詳細を出力
      throw error;
    }
  };
  const results = useSWR<T>(`${baseUrl}${path}`, fetcher, config); // SWR の型も修正
  return results;
};
