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

const Page = () => {
  const { session, isLoading: sessionLoading } = useSupabaseSession();
  const [monsters, setMonsters] = useState<CreateMonsterResponseBody[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

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

      const fetchImageUrls = async () => {
        const urls: { [key: string]: string } = {};
        for (const monster of data.monstersView) {
          const { data: imageData } = supabase.storage
            .from("post-monster")
            .getPublicUrl(monster.thumbnailImageKey);

          if (imageData?.publicUrl) {
            urls[monster.thumbnailImageKey] = imageData.publicUrl;
          }
        }
        setImageUrls(urls);
      };

      fetchImageUrls();
    }
  }, [data]); // 依存配列に data を追加

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
      <div className="flex flex-wrap justify-center gap-4">
        {data !== undefined && data?.monstersView?.length > 0 ? ( // data.monstersView が存在し、かつ長さが 0 より大きい場合
          data.monstersView.map((monsters) => (
            <Image
              key={monsters.id}
              src={imageUrls[monsters.thumbnailImageKey] || "/placeholder.png"}
              alt={monsters.name}
              width={600}
              height={848}
              priority
              className="max-w-[48%] min-w-[110px] object-contain bg-gray-200 m-2"
            />
          ))
        ) : (
          <p className="mx-auto text-text_button text-lg text-white">
            きみのモンスターはまだいないよ。
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
