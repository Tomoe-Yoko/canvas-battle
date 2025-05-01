"use client";

import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { BsEraserFill, BsPencilFill } from "react-icons/bs";
import { TbClearAll } from "react-icons/tb";
import { IoReturnUpBackOutline, IoSettings } from "react-icons/io5";
import { RiDownload2Fill } from "react-icons/ri";
import { supabase } from "@/app/_utils/supabase";
import { Modal } from "@/app/_components/Modal";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { CreateMonsterPostRequestBody } from "@/app/_types/monsters";
import { api } from "@/app/_utils/api";
import { Button } from "@/app/_components/Button";
import imageCompression from "browser-image-compression";
interface Props {
  user: { id: string };
  session: { user: { id: string } };
}

const DrawingCanvas: React.FC<Props> = ({ session }) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [penColor, setPenColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monsterName, setMonsterName] = useState("");
  const [thumbnailImageKey, setThumbnailImageKey] = useState("");
  const [isPenSettingOpen, setIsPenSettingOpen] = useState(false); //ペン（色、太さ）設定
  const [isErasing, setIsErasing] = useState(false); // false = ペン, true = 消しゴム

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  //ぺんの設定モーダル
  const openPenSetting = () => setIsPenSettingOpen(true);
  const closePenSetting = () => setIsPenSettingOpen(false);

  //Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //画像を保存
  const saveMonster = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    // 圧縮処理関数
    const compressImage = async (file: File): Promise<File> => {
      const options = {
        maxSizeMB: 0.1, // 最大サイズ (70KB 以下に圧縮)
        useWebWorker: true, // 圧縮を Web Worker で実行してパフォーマンス向上
        maxWidthOrHeight: undefined, // 元の幅と高さを維持
      };

      try {
        const compressedFile = await imageCompression(file, options);
        // console.log(
        //   "圧縮後のファイルサイズ:",
        //   compressedFile.size / 1024,
        //   "KB"
        // );
        return compressedFile;
      } catch (error) {
        console.error("画像圧縮に失敗しました:", error);
        throw new Error("画像圧縮に失敗しました");
      }
    };

    if (isSubmitting) return; // 二重送信ガード
    setIsSubmitting(true);
    try {
      if (!canvasRef.current) return;
      if (!monsterName.trim()) {
        toast.error("モンスターに名前をつけてね！");
        return;
      }

      const imageData = await canvasRef.current.exportImage("png");
      if (!imageData) {
        toast.error("画像データの取得に失敗しました。もう一度試してね。");
        console.error("Canvas から画像データが取得できませんでした。");
        return;
      }

      const fileId = uuidv4();
      const fileName = `private/${fileId}.png`;

      // 🔹 Base64 から Blob に変換
      const dataURLtoBlob = (dataURL: string): Blob => {
        try {
          const byteString = atob(dataURL.split(",")[1]);
          const arrayBuffer = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);
          }
          return new Blob([arrayBuffer], { type: "image/png" });
        } catch (err) {
          throw new Error("Base64 → Blob 変換に失敗しました:" + err);
        }
      };
      const blobData = dataURLtoBlob(imageData);
      // 圧縮処理を実行
      const compressedFile = await compressImage(blobData as File);
      const { error: uploadError } = await supabase.storage
        .from("post-monster")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) {
        toast.error("画像が保存できなかったよ。もう一回ためしてみて");
        throw uploadError;
      }
      setThumbnailImageKey(fileName);

      const monsterData: CreateMonsterPostRequestBody = {
        userId: Number(session.user.id),
        name: monsterName,
        thumbnailImageKey: fileName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // const result =
      await api.post<CreateMonsterPostRequestBody, typeof monsterData>(
        "/api/monster",
        monsterData
      );
      // console.log("モンスター保存結果:", result);
      toast.success(`モンスターが保存された！${thumbnailImageKey}`);
      setIsModalOpen(false);
      router.replace("/me");
    } catch (e) {
      console.error("保存エラー:", e);
      toast.error("画像が保存できなかったよ。もう一回ためしてみて");
    } finally {
      setIsSubmitting(false); // 最後に解除
    }
  };

  return (
    <div>
      {/* <section className="w-full mb-[20vh]"> */}
      <section className="w-full mb-[16px]">
        <div className="w-[90%] mx-auto flex items-center justify-center gap-3 my-2">
          {/* ペン（eraseMode を false にする） */}
          {/* ペン */}
          <div className=" flex flex-col items-center justify-center">
            <p className="text-white text-[50%]">ペン</p>
            <button
              type="button"
              onClick={() => {
                canvasRef.current?.eraseMode(false);
                setIsErasing(false);
              }}
              className={`p-2 rounded-lg w-[45px] ${
                !isErasing ? "bg-yellow-100" : "bg-gray-300"
              }`}
            >
              <BsPencilFill />
            </button>
          </div>

          {/* 色、太さ設定 */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-[50%]">ペン設定</p>
            <button
              type="button"
              onClick={openPenSetting}
              className="bg-gray-300 p-2 rounded-lg w-[45px]"
            >
              <IoSettings />
            </button>
          </div>
          {/* 消しゴム（白色に変更） */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-[50%]">消しゴム</p>
            <button
              type="button"
              onClick={() => {
                canvasRef.current?.eraseMode(true);
                setIsErasing(true);
              }}
              className={`p-2 rounded-lg w-[45px] ${
                isErasing ? "bg-yellow-100" : "bg-gray-300"
              }`}
            >
              <BsEraserFill />
            </button>
          </div>

          {/* 戻るボタン */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-[50%]">一つ戻る</p>
            <button
              type="button"
              onClick={() => canvasRef.current && canvasRef.current?.undo()}
              className="bg-gray-300 p-2 rounded-lg w-[45px]"
            >
              <IoReturnUpBackOutline />
            </button>
          </div>

          {/* 全消しボタン */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-[50%]">全消し</p>
            <button
              type="button"
              onClick={() =>
                canvasRef.current && canvasRef.current?.clearCanvas()
              }
              className="bg-gray-300 p-2 rounded-lg w-[45px]"
            >
              <TbClearAll />
            </button>
          </div>

          {/* 保存ボタン */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-[50%]">保存</p>
            <button
              type="button"
              onClick={openModal}
              className="bg-gray-300 p-2 rounded-lg w-[45px]"
            >
              <RiDownload2Fill />
            </button>
          </div>
        </div>
        <div className="w-90% mx-auto aspect-square">
          <ReactSketchCanvas
            ref={canvasRef}
            width="100%"
            strokeColor={penColor}
            strokeWidth={strokeWidth}
          />
        </div>
      </section>
      <Modal
        isOpen={isPenSettingOpen}
        onClose={closePenSetting}
        showCloseButton={false}
      >
        <div className="bg-white px-6 py-3 rounded-lg shadow-md w-[95%] mx-auto max-w-[43rem]">
          <h3 className="text-2xl font-bold text-center mb-4">ペンの設定</h3>

          {/* 色選択 */}
          <div className="mb-4 flex gap-4">
            <label
              htmlFor="color"
              className="block text-xl font-medium mb-2 text-gray-800"
            >
              色
            </label>
            <input
              id="color"
              type="color"
              value={penColor}
              onChange={(e) => setPenColor(e.target.value)}
              className="w-32 h-16 border "
            />
          </div>

          {/* ペンの太さをドットで選択 */}
          <div className="mb-8">
            <label className="block text-xl font-medium mb-4 ">
              ペンの太さ
            </label>
            <div className="flex justify-between items-center gap-4 ">
              {[8, 12, 16, 20, 24, 28, 32].map((size) => (
                <button
                  key={size}
                  onClick={() => setStrokeWidth(size)}
                  className={`rounded-full transition-all duration-200 ${
                    strokeWidth === size
                      ? "ring-6 ring-indigo-500 scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: "black",
                  }}
                  aria-label={`ペンの太さ ${size}px`}
                ></button>
              ))}
            </div>
          </div>

          {/* 閉じるボタン */}
          <div className="flex justify-end mt-24">
            <Button onClick={closePenSetting} variant="bg-blue">
              これでかく！
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white px-6 py-8 rounded-lg shadow-lg w-[95%] mx-auto max-w-[43rem]">
          <h3 className="text-lg font-bold mb-4">なまえをつけよう</h3>
          <input
            type="text"
            value={monsterName}
            onChange={(e) => setMonsterName(e.target.value)}
            className=" w-full p-4 text-2xl border border-indigo-700"
          />
          <div className="flex justify-center space-x-2 mt-4">
            <Button onClick={closeModal} variant="cancel">
              キャンセル
            </Button>
            <Button
              variant="bg-blue"
              onClick={saveMonster}
              disabled={isSubmitting}
            >
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </div>
        </div>
      </Modal>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DrawingCanvas;
