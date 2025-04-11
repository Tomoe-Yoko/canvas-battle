"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "../../_components/Header";
import { Footer } from "../../_components/Footer";
import Image from "next/image";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import { useFetch } from "@/app/_hooks/useFetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

const BattleResultPage = () => {
  const { session, isLoading: sessionLoading } = useSupabaseSession();
  const params = useParams(); // ← これで [id] を取得
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
    }
  }, [sessionLoading, session]);

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

  if (
    sessionLoading ||
    fetchLoading ||
    !data?.battleView ||
    !monsterUrl ||
    !enemyUrl
  ) {
    return <Loading />;
  }

  const { monster, enemy } = data.battleView;

  return (
    <div className="text-white p-4 text-center">
      <Header />
      <h2 className="text-2xl font-bold mb-4">バトル結果</h2>

      <div className="flex justify-around items-center">
        {/* 自分のモンスター */}
        <div>
          <Image
            src={monsterUrl}
            alt="きみのモンスター"
            width={150}
            height={150}
            className="object-contain bg-gray-200"
          />
          <p className="mt-2">{monster.name}</p>
        </div>
        {/* VS */}
        <div className="text-3xl">⚔️</div>
        {/* 敵のモンスター */}
        <div>
          <Image
            src={enemyUrl}
            alt="敵のモンスター"
            width={150}
            height={150}
            className="object-contain bg-gray-200"
          />
          <p className="mt-2">{enemy.name}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BattleResultPage;
