"use client";
import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";

interface Props {
  mustSpin: boolean; //スピンするかどうか
  onStop: (result: "rock" | "scissors" | "paper") => void; //結果
  spinKey: number; //外部のスピン開始イベントを検知するためのキー
}

const RouletteClientOnly: React.FC<Props> = ({ mustSpin, onStop }) => {
  const jankenData = [
    { option: "✊", value: "rock" },
    { option: "✌️", value: "scissors" },
    { option: "🖐", value: "paper" },
  ];
  const [prizeNumber, setPrizeNumber] = useState(0); //ルーレットの結果を管理
  useEffect(() => {
    if (mustSpin) {
      const random = Math.floor(Math.random() * jankenData.length);
      setPrizeNumber(random);
    }
  }, [mustSpin, jankenData.length]);

  return (
    <div>
      <div className="scale-[0.4] origin-left">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={jankenData}
          backgroundColors={["#355070", "#6b597a", "#b56576"]}
          textColors={["#ffffff"]}
          fontSize={100}
          spinDuration={0.24}
          outerBorderWidth={7}
          onStopSpinning={() => {
            const result = jankenData[prizeNumber].value as
              | "rock"
              | "scissors"
              | "paper";
            onStop(result);
          }}
        />
      </div>
    </div>
  );
};
export default RouletteClientOnly;
