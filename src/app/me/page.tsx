"use client";
import React from "react";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { Monster } from "../_types/monsters";
import Image from "next/image";

const Page = () => {
  const [thumbnailImagekey, setThumbnailImagekey] = React.useState<Monster[]>(
    []
  ); // Define thumbnailImagekey
  return (
    <div>
      <Header />
      {thumbnailImagekey.length > 0 ? (
        thumbnailImagekey.map((item: Monster) => {
          return (
            <Image
              key={item.id}
              src={item.thumbnailImagekey!}
              alt={`Selected Image ${item.id}`}
              width={600}
              height={848}
              priority
              className="max-w-[48%] min-w-[110px] object-contain bg-0[#eee] m-[2px]"
              onClick={() =>
                handleImgClick(item.signedUrl!, item.thumbnailImageKey, item.id)
              }
            />
          );
        })
      ) : (
        <p className="mx-auto text-text_button text-lg">
          きみのモンスターはまだいないよ。
        </p>
      )}

      <Footer />
    </div>
  );
};

export default Page;
