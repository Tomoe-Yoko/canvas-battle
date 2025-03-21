"use client";

import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { BsEraserFill, BsPencilFill } from "react-icons/bs";
import { TbClearAll } from "react-icons/tb";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiDownload2Fill } from "react-icons/ri";

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
      <section className="w-full mb-[20vh]">
        <h2 className="text-2xl p-4 text-white text-center mb-6">
          モンスターを描こう！
        </h2>
        <div className="ml-2  space-x-2">
          <div className="flex items-center justify-center space-x-2">
            <div>
              <label
                htmlFor="color"
                className="block text-center text-sm text-white"
              >
                色
              </label>
              <input
                id="color"
                type="color"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
                className="w-16 h-10"
              />
            </div>
            <div>
              <label
                htmlFor="strokeWidth"
                className="block text-sm text-center text-white
            "
              >
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
          </div>
          <div className="flex items-center justify-center space-x-4 my-2">
            {/* ペン（eraseMode を false にする） */}
            <button
              type="button"
              onClick={() => canvasRef.current?.eraseMode(false)}
              className="bg-white p-2 rounded-full w-[50px]"
            >
              <BsPencilFill />
            </button>

            {/* 消しゴム（白色に変更） */}
            <button
              type="button"
              onClick={() => canvasRef.current?.eraseMode(true)}
              className="bg-white p-2 rounded-full w-[50px]"
            >
              <BsEraserFill />
            </button>

            {/* 戻るボタン */}
            <button
              type="button"
              onClick={() => canvasRef.current && canvasRef.current?.undo()}
              className="bg-white p-2 rounded-full w-[50px]"
            >
              <IoReturnUpBackOutline />
            </button>

            {/* 全消しボタン */}
            <button
              type="button"
              onClick={() =>
                canvasRef.current && canvasRef.current?.clearCanvas()
              }
              className="bg-white p-2 rounded-full w-[50px]"
            >
              <TbClearAll />
            </button>

            {/* 保存ボタン */}
            <button
              type="button"
              onClick={downloadImage}
              className="bg-white p-2 rounded-full w-[50px]"
            >
              <RiDownload2Fill />
            </button>
          </div>
        </div>
        <ReactSketchCanvas
          ref={canvasRef}
          width="100%"
          height="70vh"
          strokeColor={penColor}
          strokeWidth={strokeWidth}
        />
      </section>
    </div>
  );
};

export default DrawingCanvas;
