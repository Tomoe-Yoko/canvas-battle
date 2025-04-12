"use client";

import { useState } from "react";
import { Wheel } from "react-custom-roulette";

export default function Roulette() {
  const jankenData = [
    { option: "✊" },
    { option: "✌️" },
    { option: "🖐" },
    // { option: "✊" },
    // { option: "✌️" },
    // { option: "🖐" },
  ];
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleSpinClick = () => {
    const rand = Math.floor(Math.random() * jankenData.length);
    setPrizeNumber(rand);
    setMustSpin(true);
    setResult(null); // リセット
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10 ">
      <div className="scale-[0.5] origin-top">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={jankenData}
          backgroundColors={["#355070", "#6b597a", "#b56576"]}
          // backgroundColors={["#8ecae6", "#ccffff", "#219ebc"]}
          textColors={["#ffffff"]}
          fontSize={100}
          spinDuration={0.21}
          outerBorderWidth={7}
          onStopSpinning={() => {
            setMustSpin(false);
            setResult(jankenData[prizeNumber].option);
          }}
        />
      </div>

      {/* <button
        onClick={handleSpinClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg"
      >
        スピン！
      </button>

      {result && (
        <div className="text-white text-2xl mt-4">
          あなたの手は：<strong>{result}</strong>
        </div>
      )} */}
    </div>
  );
}
