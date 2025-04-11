//画像取得のカスタムフック

"use client";
import useSWR from "swr";
import { supabase } from "../_utils/supabase";
import { CreateMonsterResponseBody } from "../_types/monsters";
import { api } from "../_utils/api";
import toast from "react-hot-toast";

const fetchMonstersWithImages = async (): Promise<{
  monsters: CreateMonsterResponseBody[];
  imageUrls: { [key: string]: string };
}> => {
  // ログイン状態の確認
  const session = supabase.auth.getSession();
  if (!session) {
    throw new Error("ログインしてください。");
  }

  try {
    const res = await api.get<{ monstersView: CreateMonsterResponseBody[] }>(
      "/api/monster"
    );

    if (!res?.monstersView) throw new Error("モンスターの取得に失敗");

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
  } catch (error) {
    console.error("fetchMonstersWithImages関数でエラー発生:", error);
    throw error; // 再スローしてSWRで拾えるようにする
  }
};

export const useFetchMonsters = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/monster",
    fetchMonstersWithImages,
    {
      onError: (error) => {
        console.error("SWRでエラー発生:", error);
        // エラーがログインエラーの場合の追加処理
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
    mutate, // 手動で再取得したい時に使う
  };
};

export default useFetchMonsters;
