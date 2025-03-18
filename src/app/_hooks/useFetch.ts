"use client";
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { api } from "../_utils/api";

export const useFetch = <T>(path: string, config?: SWRConfiguration<T>) => {
  const baseUrl = process.env.Next_PUBLIC_API_URL;
  const fetcher = async () => {
    try {
      const response = await api.get<{ data: T }>(path);
      console.log("Fetched data:", response.data); // デバッグ用
      return response.data; // 明示的に .data を返す
    } catch (error) {
      console.error("API fetch error:", error); // エラー詳細を出力
      throw error;
    }
  };

  const results = useSWR(`${baseUrl}${path}`, fetcher, config);
  return results;
};
