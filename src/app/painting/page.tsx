"use client";
import React, { useState } from "react";
import DrawingCanvas from "../_components/DrawingCanvas";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { useFetch } from "../_hooks/useFetch";
import Loading from "@/app/loading";

const Page = () => {
  const { data: user, error } = useFetch("/auth/user");
  const [loading, setLoading] = useState(false);
  if (loading) {
    setLoading(true);
    return <Loading />;
  }
  return (
    <div>
      <Header />
      {/* ログイン状態の表示 */}
      <div className="text-center my-4">
        {error ? (
          <p className="text-red-500">エラーが発生しました</p>
        ) : user ? (
          <p>ログイン中: {user.user?.email}</p>
        ) : (
          <p>ログインしていません</p>
        )}
      </div>
      <DrawingCanvas user={user} />
      <Footer />
    </div>
  );
};

export default Page;
