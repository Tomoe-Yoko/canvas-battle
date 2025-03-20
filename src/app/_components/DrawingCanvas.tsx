"use client";

import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "./Button";

const DrawingCanvas = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [penColor, setPenColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(3);

  const downloadImage = async () => {
    if (!canvasRef.current) return;
    try {
      // 画像をエクスポート
      const imageData = await canvasRef.current.exportImage("png");

      // ダウンロード用のリンクを作成
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "my-drawing.png"; // 保存するファイル名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("画像を保存したよ");
    } catch (e) {
      console.error("画像の保存が出来ませんでした", e);
      alert("画像が保存できなかったよ。もう一回ためしてみて");
    }
  };

  return (
    <div>
      <section className="w-full my-8">
        <h2 className="text-3xl p-4 text-white">お絵かきしよう！</h2>
        <div className="ml-2 flex items-center space-x-2">
          <div className="">
            <label htmlFor="color" className="block text-center  text-sm">
              色
            </label>
            <input
              id="color"
              type="color"
              value={penColor}
              onChange={(e) => setPenColor(e.target.value)}
              className="w-16 h-8"
            />
          </div>
          <div className=" ">
            <label htmlFor="strokeWidth" className="block text-sm text-center">
              ペンの太さ
            </label>
            <input
              id="strokeWidth"
              type="range"
              min="1"
              max="10"
              step="1"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-40 cursor-pointer my-2"
            />
          </div>
          {/* 消しゴム（白色に変更） */}
          <Button
            variant="bg-blue"
            type="button"
            onClick={() => canvasRef.current?.eraseMode(true)}
          >
            消しゴム
          </Button>

          {/* ペンに戻す（eraseMode を false にする） */}
          <Button
            variant="bg-blue"
            type="button"
            onClick={() => canvasRef.current?.eraseMode(false)}
          >
            ペン
          </Button>

          {/* 全消しボタン */}
          <Button
            onClick={() =>
              canvasRef.current && canvasRef.current?.clearCanvas()
            }
            variant="bg-blue"
            type="button"
          >
            全消し
          </Button>
          {/* 戻るボタン */}
          <Button
            onClick={() => canvasRef.current && canvasRef.current?.undo()}
            variant="bg-blue"
            type="button"
          >
            戻る
          </Button>

          {/* やり直しボタン */}
          {/* <Button
            onClick={() => canvasRef.current && canvasRef.current?.redo()}
            variant="bg-blue"
            type="button"
          >
            やり直し
          </Button> */}
          {/* 保存ボタン */}
          <Button onClick={downloadImage} variant="bg-blue" type="button">
            保存
          </Button>
        </div>
        <ReactSketchCanvas
          ref={canvasRef}
          width="100%"
          height="600px"
          strokeColor={penColor}
          strokeWidth={strokeWidth}
        />
      </section>
    </div>
  );
};

export default DrawingCanvas;
