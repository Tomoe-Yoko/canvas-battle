"use client";
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { api } from "../_utils/api";

export const useFetch = <T>(path: string, config?: SWRConfiguration<T>) => {
  const baseUrl = process.env.Next_PUBLIC_API_URL;
  const fetcher = async () => await api.get<T>(path);
  const results = useSWR(`${baseUrl}${path}`, fetcher, config);
  return results;
};
