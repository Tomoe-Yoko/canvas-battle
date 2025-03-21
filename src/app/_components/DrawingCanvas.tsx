"use client";

import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { BsEraserFill, BsPencilFill } from "react-icons/bs";
import { TbClearAll } from "react-icons/tb";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiDownload2Fill } from "react-icons/ri";
import { Modal } from "./Modal";
import { supabase } from "../_utils/supabase";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const DrawingCanvas = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [penColor, setPenColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(3);
  // const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monsterName, setMonsterName] = useState("");
  const router = useRouter();
  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  //Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //画像を保存
  const saveMonster = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    if (!monsterName.trim()) {
      toast.error("モンスターに名前をつけてね！");
      return;
    }

    try {
      const imageData = await canvasRef.current.exportImage("png");

      const fileId = uuidv4();
      const fileName = `monsters/${fileId}.png`;

      const { error: uploadError } = await supabase.storage
        .from("monster-images")
        .upload(fileName, dataURLtoBlob(imageData), {
          contentType: "image/png",
        });

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from("Monster")
        .insert([{ name: monsterName, thumbnailImageKey: fileId, userId: 1 }]);

      if (dbError) throw dbError;

      toast.success("モンスターが保存されました！");
      setIsModalOpen(false);
      router.refresh();
    } catch (e) {
      console.error("保存エラー:", e);
      toast.error("保存に失敗しました…");
    }
  };

  // const downloadImage = async () => {
  //   if (!canvasRef.current) return;
  //   try {
  //     // 画像をエクスポート
  //     const imageData = await canvasRef.current.exportImage("png");

  //     // ダウンロード用のリンクを作成
  //     const link = document.createElement("a");
  //     link.href = imageData;
  //     link.download = "my-drawing.png"; // 保存するファイル名
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     alert("画像を保存したよ");
  //   } catch (e) {
  //     console.error("画像の保存が出来ませんでした", e);
  //     alert("画像が保存できなかったよ。もう一回ためしてみて");
  //   }
  // };

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
                min="2"
                max="20"
                step="2"
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
              onClick={openModal}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white px-6 py-8 rounded-lg shadow-lg w-[90%]">
          <h3 className="text-lg font-bold mb-4">なまえをつけよう</h3>
          <input
            type="text"
            value={monsterName}
            onChange={(e) => setMonsterName(e.target.value)}
            className="p-4 text-2xl border border-blue-700"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={closeModal}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              キャンセル
            </button>
            <button
              onClick={saveMonster}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              保存
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );

  //画像データをBlobに変換する関数 　　必要か検証！
  const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(",")[1]);
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      arrayBuffer[i] = byteString.charCodeAt(i);
    return new Blob([arrayBuffer], { type: "image/png" });
  };
};

export default DrawingCanvas;
