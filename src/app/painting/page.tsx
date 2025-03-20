import React from "react";
import DrawingCanvas from "../_components/DrawingCanvas";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";

const page = () => {
  return (
    <div>
      <Header />
      <DrawingCanvas />
      <Footer />
    </div>
  );
};

export default page;
