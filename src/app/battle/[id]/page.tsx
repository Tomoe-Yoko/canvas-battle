"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import { Header } from "../../_components/Header";
import { Footer } from "../../_components/Footer";
import Image from "next/image";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import { useFetch } from "@/app/_hooks/useFetch";
import useBattleGame from "../_hooks/useBattleGame";
import { supabase } from "@/app/_utils/supabase";
import Roulette from "../_components/Roulette";

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
  const {
    hands,
    cpuHand,
    result,
    mustSpin,
    spinKey,
    play,
    handleCpuStop,
    resetGame,
    yourHp,
    cpuHp,
    yourHand,
    gameOver,
  } = useBattleGame(); // ルーレットの状態を管理するカスタムフック
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
    <div className="mb-60">
      {/* <Header /> */}
      <h2 className="text-white text-3xl py-[1rem] pl-[1rem] bg-gray-700">
        BATTLE🔥
      </h2>
      <div className="px-4">
        {/* 自分のモンスター */}
        <div className="flex">
          <div className="w-[60%] flex flex-col items-center">
            <p className="mt-4 mr-8 text-white text-right">
              きみ：{monster.name}
            </p>
            <div className="flex justify-end">
              <Image
                src={monsterUrl}
                alt="きみのモンスター"
                width={210}
                height={210}
                className="object-contain bg-gray-200  rounded-full "
              />
            </div>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-[30px] ${
                    i < yourHp ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  ♥
                </span>
              ))}
            </div>
          </div>

          {/* 手を選択するボタン */}
          <div className="flex flex-col items-center w-[40%] mt-[2rem]">
            <p className="text-center text-blue-400">どれをだす？</p>
            {hands.map((hand, index) => (
              <button
                key={hand}
                onClick={() => play(hand)}
                className={`w-8/12 px-4 py-2 mb-1 text-[32px] border border-blue-400 rounded-full hover:bg-blue-400 animate-blink btn-blink-${
                  index + 1
                }`}
              >
                {hand === "rock" ? "✊" : hand === "scissors" ? "✌️" : "✋"}
              </button>
            ))}
          </div>
        </div>
        {/* 結果 */}
        <div className="mt-5 text-lg">
          {yourHand && cpuHand ? (
            <div className="flex flex-col items-center bg-gray-700">
              <div>
                <p className="text-[24px] text-white my-2">
                  けっか:
                  {result}
                </p>
              </div>
              <div className="flex">
                <p className="text-blue-400 text-[24px]">
                  きみ:
                  {yourHand === "rock"
                    ? "✊"
                    : yourHand === "scissors"
                    ? "✌️"
                    : "✋"}
                </p>
                <p className="text-purple-400 text-[24px]">
                  てき:
                  {cpuHand === "rock"
                    ? "✊"
                    : cpuHand === "scissors"
                    ? "✌️"
                    : "✋"}
                </p>
              </div>
            </div>
          ) : (
            <p className="h-[90px] pt-4 text-center text-[24px] text-gray-300 bg-gray-700">
              対戦中...
            </p>
          )}
        </div>
        {/* ゲーム終了表示 */}
        {gameOver && (
          <div className="flex justify-center items-center my-1">
            <p className="text-xl font-bold text-white">
              {yourHp > 0 ? "きみの勝利🎉" : "GameOver...😵‍💫"}
            </p>
            <button
              className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={resetGame}
            >
              もう一回する！
            </button>
          </div>
        )}
        {/* 敵のモンスター */}
        <div className="flex">
          <div className="w-[40%] mt-[-3rem]">
            <Roulette
              mustSpin={mustSpin}
              spinKey={spinKey}
              onStop={handleCpuStop}
            />
          </div>
          <div className="w-[60%] flex flex-col items-center">
            <p className="mt-4 ml-8 text-white text-left">てき：{enemy.name}</p>
            <div>
              <Image
                src={enemyUrl}
                alt="敵のモンスター"
                width={210}
                height={210}
                className="object-contain bg-gray-200 rounded-full"
              />
            </div>{" "}
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-[30px] ${
                    i < cpuHp ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  ♥
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BattleResultPage;
