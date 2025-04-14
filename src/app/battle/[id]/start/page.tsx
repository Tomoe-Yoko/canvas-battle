"use client";
import React from "react";
import useGetBattleMonster from "../../_hooks/useGetBattleMonster";
import Loading from "@/app/loading";
import Image from "next/image";
const Page = () => {
  const { fetchLoading, monsterUrl, enemyUrl, sessionLoading, data } =
    useGetBattleMonster(); // バトルするモンスター画像を取得するカスタムフック
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
      <div className="">
        <div className="flex items-center mt-4 ml-4 gap-4">
          <Image
            src={monsterUrl}
            alt="きみのモンスター"
            width={240}
            height={240}
            className="object-contain text-right ring-7 ring-lime-300"
          />
          <p className="mt-4 mr-8 text-white text-right">
            きみ：{monster.name}
          </p>
        </div>
        <p className="text-center text-5xl scale-250">⚔️</p>

        <div className="flex items-center justify-end mt-4 mr-4 gap-4">
          <p className="mt-4 ml-8 text-white text-left">てき：{enemy.name}</p>
          <Image
            src={enemyUrl}
            alt="敵のモンスター"
            width={240}
            height={240}
            className="object-contain border-indigo-300 ring-7 ring-indigo-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
