"use client";
import React, { useEffect } from "react";
// import { Header } from "../_components/Header";
import { Navigation } from "../_components/Navigation";
import Loading from "@/app/loading";
import { useSupabaseSession } from "../_hooks/useSupabaseSession"; // 修正後のフックを正しくインポート
import toast from "react-hot-toast";
import DrawingCanvas from "./_components/DrawingCanvas";
import Image from "next/image";

const Page = () => {
  const { session, isLoading } = useSupabaseSession();
  // session がないときにエラートーストを表示
  useEffect(() => {
    if (!isLoading && !session?.user) {
      toast.error("ログインしてね");
    }
  }, [session, isLoading]); // session や isLoading が変わったときに実行

  if (isLoading) {
    return <Loading />;
  }
  if (!session?.user) {
    return null;
  }

  return (
    <>
      {/* <Header /> */}
      <h2 className="title-after-login">モンスターを描こう！</h2>
      <DrawingCanvas user={session.user} session={session} />
      <div className="flex items-center justify-center mt-4 w-50% mx-auto">
        <Image
          src="/top-img/heart.png"
          alt="painting"
          width={60}
          height={60}
          className="mx-auto mt-4"
        />
        <Image
          src="/top-img/neko.png"
          alt="painting"
          width={60}
          height={60}
          className="mx-auto mt-4 rotate-{}}"
        />
      </div>
      <Navigation />
    </>
  );
};

export default Page;
