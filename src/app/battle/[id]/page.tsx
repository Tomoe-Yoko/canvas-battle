"use client";
import { Navigation } from "../../_components/Navigation";
import Image from "next/image";
import Loading from "@/app/loading";
import useBattleGame from "../_hooks/useBattleGame";
// import Roulette from "../_components/Roulette";
import useGetBattleMonster from "../_hooks/useGetBattleMonster";
import { Modal } from "@/app/_components/Modal";
import { motion } from "framer-motion";
import { Button } from "@/app/_components/Button";
import { useState } from "react";
import Roulette from "../_components/RouletteClientOnly";

const BattleResultPage = () => {
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
    isModalOpen,
    closeModal,
  } = useBattleGame(); // ルーレットの状態を管理するカスタムフック

  const { fetchLoading, monsterUrl, enemyUrl, sessionLoading, data } =
    useGetBattleMonster(); // バトルするモンスター画像を取得するカスタムフック
  const [navVisible, setNavVisible] = useState(false);

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
  const handleNavigation = () => {
    setNavVisible((prev) => !prev);
  };
  return (
    <div className="h-svh">
      <h2 className="title-after-login">BATTLE🔥</h2>
      <div className="px-4">
        {/* 自分のモンスター */}
        <div className="flex">
          <div className="w-[60%] flex flex-col items-center">
            <p className="mt-4 mb-2  text-white text-right text-xs">
              きみ：{monster.name}
            </p>
            <div className="flex justify-end h-[25vh] aspect-square ">
              <Image
                src={monsterUrl}
                alt="きみのモンスター"
                width={210}
                height={210}
                unoptimized
                className="object-contain bg-gray-100  rounded-md"
              />
            </div>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 3 }).map((_, i) => {
                const isAlive = i < yourHp;
                return (
                  <motion.span
                    key={`your-heart-${i}-${isAlive}`} // 変化に反応させるyour-heart-:ただの識別用（任意の名前でOK）
                    initial={{ scale: 2.4 }}
                    animate={{
                      scale: 1,
                      color: isAlive ? "#dc2626" : "#ececec",
                    }}
                    transition={{ duration: 0.7 }}
                    className="text-[18px]"
                  >
                    ♥
                  </motion.span>
                );
              })}
            </div>
          </div>

          {/* 手を選択するボタン */}
          <div className="flex flex-col items-center w-[35%] mt-[1rem]">
            <p className="text-center text-blue-400">どれをだす？</p>
            {hands.map((hand, index) => (
              <button
                key={hand}
                onClick={() => play(hand)}
                className={`w-8/12 px-2 py-2 mb-2 text-[24px] border border-blue-400 rounded-full animate-blink btn-blink-${
                  index + 1
                }`}
              >
                {hand === "rock" ? "✊" : hand === "scissors" ? "✌️" : "✋"}
              </button>
            ))}
          </div>
        </div>
        {/* 結果 */}
        <div className="mt-2 text-lg">
          {yourHand && cpuHand ? (
            <div className="flex justify-around items-center bg-gray-700">
              <div>
                <p className="text-[24px] text-white my-2">
                  けっか:
                  {result}
                </p>
              </div>
              <div className="flex">
                <p className="text-blue-400 text-[18px]">
                  きみ:
                  {yourHand === "rock"
                    ? "✊"
                    : yourHand === "scissors"
                    ? "✌️"
                    : "✋"}
                </p>
                <p className="text-purple-400 text-[18px]">
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
            <p className="h-[53px] pt-2 text-center text-[20px] text-gray-300 bg-gray-700">
              対戦中...
            </p>
          )}
        </div>
        {/* 敵のモンスター */}
        <div className="flex">
          <div className="w-[40%] mt-[-5rem]">
            <Roulette
              mustSpin={mustSpin}
              spinKey={spinKey}
              onStop={handleCpuStop}
            />
          </div>
          <div className="w-[60%] flex flex-col items-center">
            <p className="mt-4 mb-2  text-white text-left  text-xs">
              てき：{enemy.name}
            </p>
            <div className="h-[25vh] aspect-square ">
              <Image
                src={enemyUrl}
                alt="敵のモンスター"
                width={210}
                height={210}
                unoptimized
                className="object-contain bg-gray-100  rounded-md aspect-square"
              />
            </div>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 3 }).map((_, i) => {
                const isAlive = i < cpuHp;
                return (
                  <motion.span
                    key={`cpu-heart-${i}-${isAlive}`} // 変化に反応させる
                    initial={{ scale: 2.4 }}
                    animate={{
                      scale: 1,
                      color: isAlive ? "#dc2626" : "#ececec",
                    }}
                    className="text-[18px]"
                    transition={{ duration: 0.7 }}
                  >
                    ♥
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* ゲーム終了表示 */}

      <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[#020E37] p-10 rounded-lg"
        >
          {gameOver && (
            <div className="flex flex-col items-center my-1 bg-[#020E37] p-5 rounded-lg gap-4">
              <p className="text-2xl font-bold text-white">
                {yourHp > 0 ? "きみの勝利🎉" : "GameOver...😵‍💫"}
              </p>
              <Button variant="bg-blue" onClick={resetGame}>
                もう一回する！
              </Button>
            </div>
          )}
        </motion.div>
      </Modal>
      <div className="relative flex flex-col items-start">
        <button
          onClick={handleNavigation}
          className={`z-20 transition-transform duration-300 ease-in-out transform  ${
            navVisible ? "-translate-y-24" : ""
          } flex flex-col items-center text-gray-600 px-4 py-2 mb-8 bg-amber-200 rounded-3xl text-[10px] hover:bg-amber-400 shadow-md ml-4`}
        >
          {navVisible ? (
            <span>メニューとじる</span>
          ) : (
            <span>メニューボタン</span>
          )}
          <Image
            src="/top-img/shy.png"
            alt="navButton"
            width={40}
            height={40}
            unoptimized
            className="object-contain aspect-square"
          />
        </button>

        {navVisible && (
          <div
            className={`absolute top-full left-0 w-full transition-transform duration-300 ease-in-out transform ${
              navVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Navigation />
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleResultPage;
