"use client";
import React, { useEffect, useState } from "react";
import { Navigation } from "../../_components/Navigation";
import Image from "next/image";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";
import { CreateBattleRequestBody } from "../../_types/battle";
import toast from "react-hot-toast";
import Loading from "../../loading";
import { Button } from "../../_components/Button";
import { api } from "../../_utils/api";
import { useRouter } from "next/navigation";
import useFetchMonsters from "@/app/_hooks/useFetchMonsters";
import { CreateMonsterResponseBody } from "../../_types/monsters";
import { motion } from "framer-motion";

const Page = () => {
  const { session, isLoading: sessionLoading } = useSupabaseSession(); //ログイン中のユーザー情報を取得
  const router = useRouter();
  const [selectedYourMonster, setSelectedYourMonster] =
    useState<CreateMonsterResponseBody | null>(null);
  const [selectedEnemyMonster, setSelectedEnemyMonster] =
    useState<CreateMonsterResponseBody | null>(null);
  // モンスターと画像URLを一括取得
  const { monsters, imageUrls, isLoading, error } = useFetchMonsters();

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      toast.error("ログインしてね");
    }
  }, [session, sessionLoading]);

  //monster選択
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

  //  バトルをはじめるボタンを押下
  const handleMonsterBattle = async () => {
    if (!selectedYourMonster || !selectedEnemyMonster || !session?.user.id) {
      toast.error("必要な情報が足りません！");
      return;
    }

    try {
      const res = await api.post<
        CreateBattleRequestBody,
        { id: number; userId: string; monsterId: number; enemyId: number }
      >("/api/battle", {
        id: Date.now(),
        userId: session.user.id,
        monsterId: selectedYourMonster.id,
        enemyId: selectedEnemyMonster.id,
      });

      const { id } = res;
      router.replace(`/battle/${id}/start`);
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
    <div className="pb-[18rem] overflow-x-hidden">
      <h2 className="title-after-login">モンスターをえらぶ</h2>
      <p className="text-white text-sm py-[1rem] w-[85%] mx-auto">
        モンスター一覧から、きみのモンスターと敵になるモンスター２体えらんでね！
      </p>
      <div className="flex gap-2 pt-[0.5rem]  justify-center">
        <div>
          {selectedYourMonster ? (
            <>
              <div className="border-2 border-gray-300 border-solid">
                <Image
                  src={imageUrls[selectedYourMonster.thumbnailImageKey]}
                  alt={selectedYourMonster.name}
                  width={150}
                  height={150}
                  unoptimized
                  className="object-contain m-2 aspect-square"
                />
              </div>

              <p className="w-[150px] mx-auto text-center text-white bg-[#333c54] p-2 tracking-[2px] text-[1rem] rounded-md ">
                {selectedYourMonster.name}
              </p>
            </>
          ) : (
            <div className="w-[150px] m-2 bg-black text-green-300 aspect-square text-sm p-2 pt-6">
              一覧から選択してね
            </div>
          )}
          <p className="text-white text-ml text-center">🟢きみのモンスター</p>
        </div>
        <div>
          {selectedEnemyMonster ? (
            <>
              <div className="border-2 border-gray-300 border-solid">
                <Image
                  src={imageUrls[selectedEnemyMonster.thumbnailImageKey]}
                  alt={selectedEnemyMonster.name}
                  width={150}
                  height={150}
                  className="object-contain bg-gray-200 m-2 aspect-square"
                />
              </div>
              <p className="w-[150px] mx-auto text-center text-white bg-[#333c54] p-2 tracking-[2px] text-[1rem] rounded-md">
                {selectedEnemyMonster.name}
              </p>
            </>
          ) : (
            <div className="w-[150px] m-2 bg-black  text-indigo-300 aspect-square text-sm p-2 pt-6">
              一覧から選択してね
            </div>
          )}
          <p className="text-white text-ml text-center">🟣敵のモンスター</p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={handleMonsterBattle} variant={"bg-blue"}>
          バトルをはじめる🔥
        </Button>
      </div>
      <hr className=" text-white w-[90%] mx-auto my-[1rem]" />

      <div className="w-[93%] mx-auto flex flex-wrap justify-around gap-2 pt-[0.5rem] pb-[1rem]">
        {Object.keys(imageUrls).length === monsters.length ? (
          monsters.map((monster) => (
            <div
              key={monster.id}
              onClick={() => handleMonsterClick(monster)}
              className={`w-[22%] min-w-[60px] cursor-pointer ${
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

      <div className="flex justify-end pt-8 pr-18">
        <motion.img
          src="/top-img/doro.png"
          width={230}
          height={230}
          alt="topLogo"
          initial={{ x: 32, y: 0 }}
          animate={{ x: [50, -200, 100], y: [15, -15, 15, -15, 15] }} // ゆらゆら上下に動く
          transition={{
            duration: 13,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-[32%]"
        />
      </div>
      <Navigation />
    </div>
  );
};

export default Page;
