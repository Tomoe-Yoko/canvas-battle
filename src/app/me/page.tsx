"use client";
import React, { useEffect, useState } from "react";
import { Navigation } from "../_components/Navigation";
import { CreateMonsterResponseBody } from "../_types/monsters";
import Image from "next/image";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading";
import { supabase } from "../_utils/supabase";
import { Modal } from "../_components/Modal";
import { Button } from "../_components/Button";
import { api } from "../_utils/api";
import Link from "next/link";
import useFetchMonsters from "../_hooks/useFetchMonsters";
import { useRouter } from "next/navigation";
// import { LoginForm } from "../_types/users";

const Page = () => {
  const router = useRouter();
  const { session, isLoading: sessionLoading } = useSupabaseSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonster, setSelectedMonster] =
    useState<CreateMonsterResponseBody | null>(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetcherOrNewUser = async () => {
      if (sessionLoading) return;
      if (!session?.user) {
        toast.error("ログインしてね");
        router.replace("/login");
        return;
      }
      try {
        const res = await api.get<{ data: { userName: string } }>("/api/users");
        if (!res.data.userName || res.data.userName.trim() === "") {
          await api.post("/api/users", {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata.userName || "",
          });
          toast.success("新しいユーザーを登録しました！");
          console.log(res.data.userName);
        }
      } catch (e) {
        console.error("ユーザー情報取得エラー:", e);
        toast.error("ユーザー情報の取得に失敗しました");
      }
    };

    fetcherOrNewUser();
  }, [session, sessionLoading, router]);
  const { monsters, imageUrls, isLoading, mutate } = useFetchMonsters();
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

  //put,delete
  const handleNameUpdate = async () => {
    if (!selectedMonster) return;
    try {
      if (!newName.trim()) {
        toast.error("名前を入力してね！");
        return;
      }
      await Promise.all([
        api.put(`/api/monster/${selectedMonster.id}`, { name: newName }),
      ]);
      closeModal();
      await mutate();
      toast.success("名前を更新したよ！");
      // await api.get<{
      //   status: string;
      //   monstersView: CreateMonsterResponseBody[];
      // }>("/api/monster");
    } catch (err) {
      console.error(err);
      toast.error("エラーが発生しました");
    }
  };

  const handleDelete = async () => {
    if (!selectedMonster) return;
    const confirm = window.confirm("本当に消してもいいですか？");
    if (!confirm) return;

    try {
      await api.del(`/api/monster/${selectedMonster.id}`); // バケット内の画像を削除
      const { error: storageError } = await supabase.storage
        .from("post-monster") // バケット名を指定
        .remove([selectedMonster.thumbnailImageKey]); // thumbnailImageKeyを利用

      // await api.get<{
      //   status: string;
      //   monstersView: CreateMonsterResponseBody[];
      // }>("/api/monster");

      if (storageError) {
        toast.error("バケットから画像を削除できませんでした。");
        throw new Error(
          `Failed to delete image from bucket: ${storageError.message}`
        );
      }
      closeModal();
      await mutate();
      toast.success("削除しました！");
    } catch (err) {
      console.error(err);
      toast.error("エラーが発生しました");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mb-[5rem]">
      <h2 className="title-after-login">じぶんページ</h2>
      <h3 className="text-white text-xl pt-[1.5rem] pl-[1rem] pb-[0.5rem]">
        ーーー きみの作ったモンスター👾
      </h3>
      <div className="w-[90%] mx-auto flex flex-wrap justify-between gap-1 pt-[1rem] pb-[10rem]">
        {Object.keys(imageUrls).length === monsters.length ? (
          monsters.map((monster) => (
            <div
              key={monster.id}
              onClick={() => openModal(monster)}
              className="cursor-pointer sm:max-w-[215px] max-w-[150px] min-w-[43%] pb-4"
            >
              <Image
                src={imageUrls[monster.thumbnailImageKey] || "/placeholder.png"}
                alt={monster.name}
                width={300}
                height={200}
                priority
                unoptimized
                className="  object-contain bg-gray-200 aspect-square"
              />
              <p className="w-[150px] mx-auto text-center text-white bg-[#333c54] p-2 tracking-[2px] text-[0.8rem] rounded-md">
                {monster.name}
              </p>
            </div>
          ))
        ) : (
          <Loading />
        )}

        {monsters.length > 0 ? (
          <>
            <p className="block w-full p-4 text-center text-white">
              どのキャラクターもイケてる😎
              <br />
              てきとじゃんけんで戦ってみてね🔥
            </p>
            <Link href="/battle/ready" className="mx-auto ">
              <Button variant="bg-blue">じゃんけんバトル！⚔️</Button>
            </Link>
          </>
        ) : (
          <>
            <p className="block w-full p-4 text-center text-white">
              まだきみのモンスターはいないよ！
              <br />
              まずは「おえかき」からモンスターをつくってね👽
            </p>
            <Link href="/painting" className="mx-auto ">
              <Button variant="bg-blue">モンスターを描く🎨</Button>
            </Link>
          </>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMonster && (
          <div className="mt-30">
            <Image
              src={
                imageUrls[selectedMonster.thumbnailImageKey] ||
                "/placeholder.png"
              }
              alt={selectedMonster.name}
              width={600}
              height={600}
              priority
              className="max-w-[330px]  object-contain bg-gray-200  mx-auto"
            />
            <div className="p-2 flex items-center gap-2 w-[90%] mx-auto">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded text-white w-[60%] h-16 px-2 py-2"
              />
              <Button
                variant="bg-blue"
                onClick={handleNameUpdate}
                disabled={isLoading}
              >
                <>
                  なまえ
                  <br />
                  変更
                </>
              </Button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="delete"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "モンスター削除中" : "モンスター削除"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
      <Toaster />
      <Navigation />
    </div>
  );
};

export default Page;
