"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../_components/Header";
import { Footer } from "../../_components/Footer";
import Image from "next/image";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";
import { useFetch } from "../../_hooks/useFetch";
import toast from "react-hot-toast";
import { CreateMonsterResponseBody } from "../../_types/monsters";
import Loading from "../../loading";
import { supabase } from "../../_utils/supabase";
import { Button } from "../../_components/Button";
import { api } from "../../_utils/api";
import { BattleResponse } from "../../_types/battle";
import router from "next/router";

const Page = () => {
  const { session, isLoading: sessionLoading } = useSupabaseSession();
  const [monsters, setMonsters] = useState<CreateMonsterResponseBody[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [selectedYourMonster, setSelectedYourMonster] =
    useState<CreateMonsterResponseBody | null>(null);
  const [selectedEnemyMonster, setSelectedEnemyMonster] =
    useState<CreateMonsterResponseBody | null>(null);

  const {
    data,
    error,
    isLoading: fetchLoading,
  } = useFetch<{
    status: string;
    monstersView: CreateMonsterResponseBody[];
  }>("/api/monster");
  const isLoading = sessionLoading || fetchLoading; // ローディング状態を統合

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      toast.error("ログインしてね");
    }
  }, [session, sessionLoading]);
  const fetchImageUrls = useCallback(
    async (monsterList: CreateMonsterResponseBody[]) => {
      const urls: { [key: string]: string } = {};
      for (const monster of monsterList) {
        const { data: signedUrlData } = await supabase.storage
          .from("post-monster")
          .createSignedUrl(monster.thumbnailImageKey, 60 * 60 * 24);

        if (signedUrlData?.signedUrl) {
          urls[monster.thumbnailImageKey] = signedUrlData.signedUrl;
        }
      }
      setImageUrls(urls);
    },
    []
  );

  useEffect(() => {
    if (data?.monstersView) {
      setMonsters(data.monstersView);
      fetchImageUrls(data.monstersView); // 再利用！
    }
  }, [data, fetchImageUrls]);
  ////////////monnster選択
  const handleMonsterClick = (monster: CreateMonsterResponseBody) => {
    if (selectedYourMonster?.id === monster.id) {
      setSelectedYourMonster(null);
      return;
    }

    // すでに「敵のモンスター」として選ばれている場合 → 解除
    if (selectedEnemyMonster?.id === monster.id) {
      setSelectedEnemyMonster(null);
      return;
    }

    // 未選択なら、空いてるスロットに割り当て
    if (!selectedYourMonster) {
      setSelectedYourMonster(monster);
    } else if (!selectedEnemyMonster) {
      setSelectedEnemyMonster(monster);
    } else {
      toast("2体まで選べます。解除したい場合はもう一度クリックしてね！");
    }
  };

  // モンスター選択後の処理
  const handleMonsterBattle = async () => {
    if (!selectedYourMonster || !selectedEnemyMonster || !session?.user?.id) {
      toast.error("必要な情報が足りません！");
      return;
    }

    try {
      const response = await api.post<
        BattleResponse,
        {
          userId: string;
          monsterId: number;
          enemyId: number;
        }
      >("/api/battle", {
        userId: session.user.id,
        monsterId: selectedYourMonster.id,
        enemyId: selectedEnemyMonster.id,
      });

      const data = response;

      console.log("バトル情報:", data);

      // ページ遷移
      router.push(`/battle/[id]`);
    } catch (err) {
      toast.error("バトル登録に失敗しました");
      console.error(err);
    }
  };
  if (isLoading) return <Loading />;
  if (error instanceof Error) {
    toast.error("モンスターの取得に失敗しました");
  }
  return (
    <div className="pb-[10rem]">
      <Header />
      <h2 className="text-white text-3xl py-[1rem] pl-[1rem] bg-gray-700">
        モンスターをえらぶ
      </h2>
      <p className="text-white text-sm py-[1rem] pl-[1rem]">
        きみのモンスターと、敵になるモンスター２体えらんでね！
      </p>
      <div className="w-[95%] mx-auto flex flex-wrap justify-between pt-[0.5rem] pb-[1rem]">
        {Object.keys(imageUrls).length === monsters.length ? (
          monsters.map((monster) => (
            <div
              key={monster.id}
              onClick={() => handleMonsterClick(monster)}
              className={`cursor-pointer ${
                selectedYourMonster?.id === monster.id
                  ? "ring-4 ring-lime-300"
                  : selectedEnemyMonster?.id === monster.id
                  ? "ring-4 ring-indigo-300"
                  : ""
              }`}
            >
              <Image
                src={imageUrls[monster.thumbnailImageKey] || "/placeholder.png"}
                alt={monster.name}
                width={85}
                height={85}
                priority
                className=" object-contain bg-gray-200 m-2 aspect-square"
                onClick={() => {}}
              />
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <hr className=" text-white w-[90%] mx-auto my-[1rem]" />
      <div className="flex gap-2 pt-[0.5rem]  justify-center">
        <div>
          <p className="text-white text-ml pt-[1rem] text-center">
            🟢きみのモンスター
          </p>

          {selectedYourMonster ? (
            <>
              <Image
                src={imageUrls[selectedYourMonster.thumbnailImageKey]}
                alt={selectedYourMonster.name}
                width={150}
                height={150}
                className="object-contain m-2 aspect-square bg-amber-100"
              />

              <p className="w-[150px] mx-auto text-center text-white bg-[#333c54] p-2 tracking-[2px] text-[1rem] rounded-md">
                {selectedYourMonster.name}
              </p>
            </>
          ) : (
            <div className="w-[150px] m-2 bg-black text-green-300 aspect-square text-sm p-2 pt-6">
              一覧から選択してね
            </div>
          )}
        </div>
        <div>
          <p className="text-white text-ml pt-[1rem] text-center">
            🟣敵のモンスター
          </p>
          {selectedEnemyMonster ? (
            <>
              <Image
                src={imageUrls[selectedEnemyMonster.thumbnailImageKey]}
                alt={selectedEnemyMonster.name}
                width={150}
                height={150}
                className="object-contain bg-gray-200 m-2 aspect-square"
              />
              <p className="w-[150px] mx-auto text-center text-white bg-[#333c54] p-2 tracking-[2px] text-[1rem] rounded-md">
                {selectedEnemyMonster.name}
              </p>
            </>
          ) : (
            <div className="w-[150px] m-2 bg-black text-indigo-300 aspect-square text-sm p-2 pt-6">
              一覧から選択してね
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={handleMonsterBattle} variant={"bg-blue"}>
          バトルをはじめる！
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
