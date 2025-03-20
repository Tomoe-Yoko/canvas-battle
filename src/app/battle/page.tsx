"use client";
import React from "react";
import Battle from "../_components/Battle";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";

const page = () => {
  return (
    <div>
      <Header />
      <Battle />
      <Footer />
    </div>
  );
};

export default page;
