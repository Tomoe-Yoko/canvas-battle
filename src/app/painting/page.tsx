"use client";
import React, { useEffect } from "react";
import { Navigation } from "../_components/Navigation";
import { CatWalk } from "../_components/CatWalk";
import Loading from "@/app/loading";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import toast from "react-hot-toast";
import DrawingCanvas from "./_components/DrawingCanvas";

const Page = () => {
  const { session, isLoading } = useSupabaseSession();
  useEffect(() => {
    if (!isLoading && !session?.user) {
      toast.error("ログインしてね");
    }
  }, [session, isLoading]);
  if (isLoading) {
    return <Loading />;
  }
  if (!session?.user) {
    return null;
  }

  return (
    <>
      <h2 className="title-after-login">モンスターを描こう！</h2>
      <DrawingCanvas user={session.user} session={session} />
      <CatWalk />
      <Navigation />
    </>
  );
};

export default Page;
