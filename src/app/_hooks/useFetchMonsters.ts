//画像取得のカスタムフック

"use client";
import useSWR from "swr";
import { supabase } from "../_utils/supabase";
import { CreateMonsterResponseBody } from "../_types/monsters";
import { api } from "../_utils/api";

const fetchMonstersWithImages = async (): Promise<{
  monsters: CreateMonsterResponseBody[];
  imageUrls: { [key: string]: string };
}> => {
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
};

export const useFetchMonsters = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/monster",
    fetchMonstersWithImages
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

// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { supabase } from "../_utils/supabase";
// import { CreateMonsterResponseBody } from "../_types/monsters";
// import { api } from "../_utils/api";
// export const useFetchMonsters = () => {
//   const [monsters, setMonsters] = useState<CreateMonsterResponseBody[]>([]);
//   const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchMonsters = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get<{
//         monstersView: CreateMonsterResponseBody[];
//       }>("/api/monster");

//       if (!res?.monstersView) throw new Error("データ取得失敗");

//       setMonsters(res.monstersView);

//       // サムネ画像のURL取得
//       const urls: { [key: string]: string } = {};
//       for (const monster of res.monstersView) {
//         const { data: signedUrlData } = await supabase.storage
//           .from("post-monster")
//           .createSignedUrl(monster.thumbnailImageKey, 60 * 60 * 24);
//         if (signedUrlData?.signedUrl) {
//           urls[monster.thumbnailImageKey] = signedUrlData.signedUrl;
//         }
//       }

//       setImageUrls(urls);
//     } catch (err) {
//       setError(err as Error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMonsters();
//   }, [fetchMonsters]);

//   return {
//     monsters,
//     imageUrls,
//     isLoading,
//     error,
//     fetchMonsters, // 🔁 再取得用の関数
//   };
// };

// export default useFetchMonsters;
