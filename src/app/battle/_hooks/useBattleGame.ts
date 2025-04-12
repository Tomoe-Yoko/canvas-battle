"use client";
import { useState } from "react";
type Hand = "rock" | "scissors" | "paper";

const useBattleGame = () => {
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
  return {
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
  };
};

export default useBattleGame;
