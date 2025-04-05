"use client";
import React, { useState, useEffect } from "react";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { CreateMonsterResponseBody } from "../_types/monsters";
import Image from "next/image";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import toast from "react-hot-toast";
import Loading from "../loading";
import { useFetch } from "../_hooks/useFetch";
import { supabase } from "../_utils/supabase";
import { Modal } from "../_components/Modal";
import { Button } from "../_components/Button";

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

  useEffect(() => {
    if (data?.monstersView) {
      setMonsters(data.monstersView);
      console.log(data.monstersView); // ここで monstersView を確認
      const fetchImageUrls = async () => {
        const urls: { [key: string]: string } = {};
        for (const monster of data.monstersView) {
          const { data: signedUrlData } = await supabase.storage
            .from("post-monster")
            .createSignedUrl(monster.thumbnailImageKey, 60 * 60 * 24); // 有効期限を24時間に設定 (秒単位)

          // if (signedUrlError) {
          //   console.error("署名付きURLの生成エラー:", signedUrlError);
          //   continue; // エラーが発生した場合はスキップ
          // }

          if (signedUrlData?.signedUrl) {
            urls[monster.thumbnailImageKey] = signedUrlData.signedUrl;
          }
        }
        setImageUrls(urls);
      };

      fetchImageUrls();
    }
  }, [data]); // 依存配列に data を追加
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
      const response = await fetch(`/api/monster/${selectedMonster.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.access_token ?? "",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (response.ok) {
        toast.success("名前を更新したよ！");
        closeModal();
        location.reload(); // ←またはSWREのrevalidate使ってもOK
      } else {
        toast.error("名前の更新に失敗");
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
      const response = await fetch(`/api/monster/${selectedMonster.id}`, {
        method: "DELETE",
        headers: {
          Authorization: session?.access_token ?? "",
        },
      });
      if (response.ok) {
        toast.success("削除しました！");
        closeModal();
        location.reload(); // 同上
      } else {
        toast.error("削除に失敗しました");
      }
    } catch (err) {
      console.error(err);
      toast.error("エラーが発生しました");
    }
  };

  /////////
  if (isLoading) return <Loading />;
  // if (!session?.user) return null;
  if (error instanceof Error) {
    toast.error("モンスターの取得に失敗しました");

    return (
      <p className="text-center text-red-500">データの取得に失敗しました</p>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-between gap-6 pt-[3rem] pb-[10rem]">
        {Object.keys(imageUrls).length === monsters.length ? (
          monsters.map((monster) => (
            <div key={monster.id}>
              <Image
                src={imageUrls[monster.thumbnailImageKey] || "/placeholder.png"}
                alt={monster.name}
                width={300}
                height={200}
                priority
                className="sm:max-w-[215px] max-w-[180px] min-w-[110px] object-contain bg-gray-200 m-2"
                onClick={() => openModal(monster)}
              />
              <p className="w-[180px] mx-auto text-center text-white bg-[#333c54] p-2 tracking-[2px] text-[1rem] rounded-md">
                {monster.name}
              </p>
            </div>
          ))
        ) : (
          <Loading />
        )}
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
                className="border rounded text-white w-[70%]"
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
      <Footer />
    </div>
  );
};

export default Page;
