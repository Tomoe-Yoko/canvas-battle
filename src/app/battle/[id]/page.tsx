"use client";
// import { Header } from "../../_components/Header";
import { Footer } from "../../_components/Footer";
import Image from "next/image";
import Loading from "@/app/loading";
import useBattleGame from "../_hooks/useBattleGame";
import Roulette from "../_components/Roulette";
import useGetBattleMonster from "../_hooks/useGetBattleMonster";
import { Modal } from "@/app/_components/Modal";

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
            </div>
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
      {/* ゲーム終了表示 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {gameOver && (
          <div className="flex flex-col items-center my-1 bg-[#23293b] p-10 rounded-lg">
            <p className="text-3xl font-bold text-white">
              {yourHp > 0 ? "きみの勝利🎉" : "GameOver...😵‍💫"}
            </p>
            <button
              className="mt-8  px-6 py-4 text-2xl bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={resetGame}
            >
              もう一回する！
            </button>
          </div>
        )}
      </Modal>
      <Footer />
    </div>
  );
};

export default BattleResultPage;
