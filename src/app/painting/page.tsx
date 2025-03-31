"use client";
import React, { useEffect } from "react";
import DrawingCanvas from "../_components/DrawingCanvas";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import Loading from "@/app/loading";
import { useSupabaseSession } from "../_hooks/useSupabaseSession"; // 修正後のフックを正しくインポート
import toast from "react-hot-toast";

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
      <Header />
      <DrawingCanvas user={session.user} />
      <Footer />
    </>
  );
};

export default Page;
