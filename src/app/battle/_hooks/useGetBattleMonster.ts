"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import toast from "react-hot-toast";
import { useFetch } from "@/app/_hooks/useFetch";
import { supabase } from "@/app/_utils/supabase";
import { useRouter } from "next/navigation";

interface BattleViewResponse {
  id: number;
  monster: {
    name: string;
    thumbnailImageKey: string;
  };
  enemy: {
    name: string;
    thumbnailImageKey: string;
  };
}

const useGetBattleMonster = () => {
  const { session, isLoading: sessionLoading } = useSupabaseSession();
  const router = useRouter();
  const params = useParams(); //id取得
  const battleId = params?.id as string;

  const { data, isLoading: fetchLoading } = useFetch<{
    status: string;
    battleView: BattleViewResponse;
  }>(`/api/battle/${battleId}`);

  const [monsterUrl, setMonsterUrl] = useState<string>("");
  const [enemyUrl, setEnemyUrl] = useState<string>("");

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      toast.error("ログインしてね");
      router.replace("/login");
    }
  }, [sessionLoading, session, router]);

  useEffect(() => {
    const generateSignedUrls = async () => {
      if (!data?.battleView) return;

      const { monster, enemy } = data.battleView;

      try {
        const { data: mData, error: mError } = await supabase.storage
          .from("post-monster")
          .createSignedUrl(monster.thumbnailImageKey, 60);

        const { data: eData, error: eError } = await supabase.storage
          .from("post-monster")
          .createSignedUrl(enemy.thumbnailImageKey, 60);

        if (mError || eError) {
          toast.error("画像の取得に失敗しました");
          return;
        }

        setMonsterUrl(mData?.signedUrl || "");
        setEnemyUrl(eData?.signedUrl || "");
      } catch (err) {
        console.error("サインドURL取得エラー:", err);
        toast.error("画像URLの取得に失敗しました");
      }
    };

    if (data?.battleView) {
      generateSignedUrls();
    }
  }, [data]);

  return { fetchLoading, monsterUrl, enemyUrl, sessionLoading, data };
};

export default useGetBattleMonster;
