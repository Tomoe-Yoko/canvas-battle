"use client";
import React from "react";
import DrawingCanvas from "../_components/DrawingCanvas";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import Loading from "@/app/loading";
import { useSupabaseSession } from "../_hooks/useSupabaseSession"; // 修正後のフックを正しくインポート
import toast from "react-hot-toast";

const Page = () => {
  const { session, isLoading } = useSupabaseSession();
  if (!session) {
    toast.error("ログインしてね");
    return null;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      {session?.user ? (
        <DrawingCanvas user={session.user} />
      ) : (
        (() => {
          toast.error("ログインしてください");
          return null;
        })()
      )}
      <Footer />
    </div>
  );
};

export default Page;
