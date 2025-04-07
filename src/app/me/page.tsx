"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { CreateMonsterResponseBody } from "../_types/monsters";
import Image from "next/image";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading";
import { useFetch } from "../_hooks/useFetch";
import { supabase } from "../_utils/supabase";
import { Modal } from "../_components/Modal";
import { Button } from "../_components/Button";
import { api } from "../_utils/api";
import Link from "next/link";

const Page = () => {
  const { session, isLoading: sessionLoading } = useSupabaseSession();
  const [monsters, setMonsters] = useState<CreateMonsterResponseBody[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonster, setSelectedMonster] =
    useState<CreateMonsterResponseBody | null>(null);
  const [newName, setNewName] = useState("");
  const {
    data,
    error,
    isLoading: fetchLoading,
  } = useFetch<{
    status: string;
    monstersView: CreateMonsterResponseBody[];
  }>("/api/monster");
  const isLoading = sessionLoading || fetchLoading; // ローディング状態を統合

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      toast.error("ログインしてね");
    }
  }, [session, sessionLoading]);
  const fetchImageUrls = useCallback(
    async (monsterList: CreateMonsterResponseBody[]) => {
      const urls: { [key: string]: string } = {};
      for (const monster of monsterList) {
        const { data: signedUrlData } = await supabase.storage
          .from("post-monster")
          .createSignedUrl(monster.thumbnailImageKey, 60 * 60 * 24);

        if (signedUrlData?.signedUrl) {
          urls[monster.thumbnailImageKey] = signedUrlData.signedUrl;
        }
      }
      setImageUrls(urls);
    },
    []
  );

  useEffect(() => {
    if (data?.monstersView) {
      setMonsters(data.monstersView);
      fetchImageUrls(data.monstersView); // 再利用！
    }
  }, [data, fetchImageUrls]);

  //Modal
  const openModal = (monster: CreateMonsterResponseBody) => {
    setSelectedMonster(monster);
    setNewName(monster.name); // 名前初期化
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMonster(null);
  };

  /////////////put,delete
  const handleNameUpdate = async () => {
    if (!selectedMonster) return;
    try {
      if (!newName.trim()) {
        toast.error("名前を入力してね！");
        return;
      }
      await api.put(`/api/monster/${selectedMonster.id}`, { name: newName });
      closeModal();
      toast.success("名前を更新したよ！");
      const updated = await api.get<{
        status: string;
        monstersView: CreateMonsterResponseBody[];
      }>("/api/monster");
      if (updated?.monstersView) {
        setMonsters(updated.monstersView);
        await fetchImageUrls(updated.monstersView); // 再利用！
      }
    } catch (err) {
      console.error(err);
      toast.error("エラーが発生しました");
    }
  };

  const handleDelete = async () => {
    if (!selectedMonster) return;
    const confirm = window.confirm("本当に削除してもいいですか？");
    if (!confirm) return;

    try {
      await api.del(`/api/monster/${selectedMonster.id}`); // バケット内の画像を削除
      const { error: storageError } = await supabase.storage
        .from("post-monster") // バケット名を指定
        .remove([selectedMonster.thumbnailImageKey]); // thumbnailImageKeyを利用
      closeModal();
      toast.success("削除しました！");
      const updated = await api.get<{
        status: string;
        monstersView: CreateMonsterResponseBody[];
      }>("/api/monster");
      if (updated?.monstersView) {
        setMonsters(updated.monstersView);
        await fetchImageUrls(updated.monstersView); // 再利用！
      }
      if (storageError) {
        toast.error("バケットから画像を削除できませんでした。");
        throw new Error(
          `Failed to delete image from bucket: ${storageError.message}`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("エラーが発生しました");
    }
  };

  /////////
  if (isLoading) return <Loading />;
  if (error instanceof Error) {
    toast.error("モンスターの取得に失敗しました");

    return (
      <p className="text-center text-red-500">データの取得に失敗しました</p>
    );
  }

  return (
    <div>
      <Header />
      <h2 className="text-white text-3xl py-[1rem] pl-[1rem] bg-gray-700">
        じぶんページ
      </h2>
      <h3 className="text-white text-xl pt-[1.5rem] pl-[1rem] pb-[0.5rem]">
        ーーー きみの作ったモンスター👾
      </h3>
      <div className="flex flex-wrap justify-between gap-6 pt-[1rem] pb-[10rem]">
        {Object.keys(imageUrls).length === monsters.length ? (
          monsters.map((monster) => (
            <div
              key={monster.id}
              onClick={() => openModal(monster)}
              className="cursor-pointer"
            >
              <Image
                src={imageUrls[monster.thumbnailImageKey] || "/placeholder.png"}
                alt={monster.name}
                width={300}
                height={200}
                priority
                className="sm:max-w-[215px] max-w-[180px] min-w-[110px] object-contain bg-gray-200 m-2 aspect-square"
              />
              <p className="w-[180px] mx-auto text-center text-white bg-[#333c54] p-2 tracking-[2px] text-[1rem] rounded-md">
                {monster.name}
              </p>
            </div>
          ))
        ) : (
          <Loading />
        )}

        <p className=" block w-full p-4 text-center text-white">
          どのキャラクターもイケてる！
          <br />
          てきとじゃんけんで戦ってみてね🔥
        </p>
        <Link href="/battle_ready" className="mx-auto ">
          <Button variant="bg-blue">じゃんけんをする</Button>
        </Link>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMonster && (
          <div>
            <Image
              src={
                imageUrls[selectedMonster.thumbnailImageKey] ||
                "/placeholder.png"
              }
              alt={selectedMonster.name}
              width={600}
              height={600}
              priority
              className="max-w-[430px]  object-contain bg-gray-200  mx-auto"
            />
            <div className="p-2 flex gap-2 w-[90%] mx-auto">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded text-white w-[70%] px-2"
              />
              <Button variant="bg-blue" onClick={handleNameUpdate}>
                なまえ
                <br />
                変更
              </Button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="delete" onClick={handleDelete}>
                モンスター削除
              </Button>
            </div>
          </div>
        )}
      </Modal>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Page;
