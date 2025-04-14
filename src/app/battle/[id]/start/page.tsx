"use client";
import React, { useEffect } from "react";
import useGetBattleMonster from "../../_hooks/useGetBattleMonster";
import Loading from "@/app/loading";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const params = useParams(); //  battleId を取得
  const id = params.id as string;
  const { fetchLoading, monsterUrl, enemyUrl, sessionLoading, data } =
    useGetBattleMonster(); // バトルするモンスター画像を取得するカスタムフック

  useEffect(() => {
    if (!sessionLoading && data?.battleView && monsterUrl && enemyUrl) {
      const timer = setTimeout(() => {
        router.push(`/battle/${id}/`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sessionLoading, data, monsterUrl, enemyUrl, router, id]);

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
    <div>
      <h2 className="text-center text-white text-3xl py-[1rem] pl-[1rem] bg-gray-700">
        バトル開始！🔥
      </h2>
      <div className="">
        <div className="flex items-center mt-4 ml-4 gap-4">
          <Image
            src={monsterUrl}
            alt="きみのモンスター"
            width={240}
            height={240}
            className="object-contain text-right ring-7 ring-lime-300  rounded-2xl"
          />
          <p className="mt-4 mr-8 text-white text-right text-3xl">
            {monster.name}
          </p>
        </div>

        <Image
          src={"/VS.png"}
          alt="敵のモンスター"
          width={80}
          height={80}
          className="object-contain scale-200 mx-auto my-4"
        />

        <div className="flex items-center justify-end mt-4 mr-4 gap-4">
          <p className="mt-4 ml-8 text-white text-left text-3xl">
            {enemy.name}
          </p>
          <Image
            src={enemyUrl}
            alt="敵のモンスター"
            width={240}
            height={240}
            className="object-contain border-indigo-300 ring-7 ring-indigo-300 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
