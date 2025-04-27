//画像取得のカスタムフック
"use client";
import useSWR from "swr";
import { supabase } from "../_utils/supabase";
import { CreateMonsterResponseBody } from "../_types/monsters";
import { api } from "../_utils/api";
import toast from "react-hot-toast";

type Options = {
  enabled?: boolean;
};

const fetchMonstersWithImages = async (): Promise<{
  monsters: CreateMonsterResponseBody[];
  imageUrls: { [key: string]: string };
}> => {
  // ログイン状態の確認
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    throw new Error("ログインしてください。");
  }

  const res = await api.get<{ monstersView: CreateMonsterResponseBody[] }>(
    "/api/monster"
  );

  if (!res?.monstersView) {
    throw new Error("モンスターの取得に失敗");
  }

  const imageUrls: { [key: string]: string } = {};
  for (const monster of res.monstersView) {
    const { data: signedUrlData } = await supabase.storage
      .from("post-monster")
      .createSignedUrl(monster.thumbnailImageKey, 60 * 60 * 24);

    if (signedUrlData?.signedUrl) {
      imageUrls[monster.thumbnailImageKey] = signedUrlData.signedUrl;
    }
  }

  return {
    monsters: res.monstersView,
    imageUrls,
  };
};

export const useFetchMonsters = (options?: Options) => {
  const { data, error, isLoading, mutate } = useSWR(
    options?.enabled !== false ? "/api/monster" : null, // enabled: falseならSWR無効
    fetchMonstersWithImages,
    {
      onError: (error) => {
        console.error("SWRでエラー発生:", error);
        if (error.message === "ログインしてください。") {
          toast.error("ログインしてください");
        }
      },
    }
  );

  return {
    monsters: data?.monsters ?? [],
    imageUrls: data?.imageUrls ?? {},
    isLoading,
    error,
    mutate,
  };
};

export default useFetchMonsters;
