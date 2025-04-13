"use client";
import React, { useState } from "react";
import Roulette from "../battle/_components/Roulette";
type Hand = "rock" | "scissors" | "paper";

const Battle = () => {
  const hands: Hand[] = ["rock", "scissors", "paper"];
  const [yourHand, setYourHand] = useState<Hand | null>(null);
  const [cpuHand, setCpuHand] = useState<Hand | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [yourHp, setYourHp] = useState<number>(3);
  const [cpuHp, setCpuHp] = useState<number>(3);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [spinKey, setSpinKey] = useState(0); // 敵ルーレット開始イベントを検知するためのキー

  //勝敗
  const judge = (you: Hand, cpu: Hand): "win" | "lose" | "draw" => {
    if (you === cpu) return "draw";
    if (
      (you === "rock" && cpu === "scissors") ||
      (you === "scissors" && cpu === "paper") ||
      (you === "paper" && cpu === "rock")
    ) {
      return "win";
    }
    return "lose";
  };

  //じゃんけんトリガー
  const play = (hand: Hand) => {
    if (gameOver) return;
    setYourHand(hand);
    setCpuHand(null); // 敵の手はルーレット後に決まる
    setResult(null);
    setSpinKey((prev) => prev + 1); // スピンキーを更新してルーレットを回す
    setMustSpin(true); // ルーレットを回すフラグを立てる
  };

  // 敵のルーレットが止まったときに呼ぶ
  const handleCpuStop = (cpuChoice: Hand) => {
    setMustSpin(false); // ルーレットをとめる
    setCpuHand(cpuChoice); // 敵の手をセット
    if (!yourHand) return;
    const matchResult = judge(yourHand, cpuChoice);
    setResult(matchResult); // 結果をセット
    if (matchResult === "lose") {
      setYourHp((hp) => hp - 1);
    } else if (matchResult === "win") {
      setCpuHp((hp) => hp - 1);
    }

    // HPが0になったらゲーム終了
    if (
      yourHp - (matchResult === "lose" ? 1 : 0) === 0 ||
      cpuHp - (matchResult === "win" ? 1 : 0) === 0
    ) {
      setGameOver(true);
    }
  };
  // ゲームリセット
  const resetGame = () => {
    setYourHand(null);
    setCpuHand(null);
    setResult(null);
    setYourHp(3);
    setCpuHp(3);
    setGameOver(false);
  };
  return (
    <>
      <div className="flex flex-col items-start justify-center bg-gray-100">
        {/* hp */}
        <div className="mt-3 flex gap-8">
          <div>
            <p className="text-lg font-bold text-blue-400">きみのHP</p>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-[40px] ${
                    i < yourHp ? "text-red-400" : "text-gray-300"
                  }`}
                >
                  ♥
                </span>
              ))}
            </div>
          </div>
          {/* 手を選択するボタン */}
          <div>
            <p className="text-center text-blue-400">どれをだす？</p>
            {hands.map((hand) => (
              <button
                key={hand}
                onClick={() => play(hand)}
                className="px-4 py-2 text-[36px] border border-blue-400 rounded-full hover:bg-blue-400"
              >
                {hand === "rock" ? "✊" : hand === "scissors" ? "✌️" : "✋"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-lg font-bold text-purple-400">てきのHP</p>
          <div className="flex gap-1 justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`text-[40px] ${
                  i < cpuHp ? "text-red-400" : "text-gray-300"
                }`}
              >
                ♥
              </span>
            ))}
          </div>
          <Roulette
            mustSpin={mustSpin}
            spinKey={spinKey}
            onStop={handleCpuStop}
          />
        </div>
        {/* 結果 */}
        <div className="mt-5 text-lg">
          {yourHand && cpuHand && (
            <>
              <p className="text-[36px] text-gray-600 my-2">けっか</p>
              <div className="flex">
                <p className="text-blue-400 text-[36px]">
                  きみ:
                  {yourHand === "rock"
                    ? "✊"
                    : yourHand === "scissors"
                    ? "✌️"
                    : "✋"}
                </p>
                <p className="text-purple-400 text-[36px]">
                  てき:
                  {cpuHand === "rock"
                    ? "✊"
                    : cpuHand === "scissors"
                    ? "✌️"
                    : "✋"}
                </p>
                <p className="font-bold  text-[28px] ml-4 text-gray-600">
                  {result}
                </p>
              </div>
            </>
          )}
        </div>

        {/* ゲーム終了表示 */}
        {gameOver && (
          <div className="my-5">
            <p className="text-xl font-bold">
              {yourHp > 0 ? "きみの勝利！" : "GameOver..."}
            </p>
            <button
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              onClick={resetGame}
            >
              もう一回する！
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Battle;
