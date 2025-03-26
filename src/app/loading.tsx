import React from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div aria-label="Now Loading...">
      {/* <Skeleton /> */}
      {/* <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
    </div> */}
      <div className="relative w-[200px] h-[60px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="circle w-[20px] h-[20px] absolute rounded-full bg-white left-[15%] animate-circle"></div>
        <div className="circle w-[20px] h-[20px] absolute rounded-full bg-white left-[45%] animate-circle delay-[0.2s]"></div>
        <div className="circle w-[20px] h-[20px] absolute rounded-full bg-white right-[15%] animate-circle delay-[0.3s]"></div>
        <div className="shadow w-[20px] h-[4px] absolute rounded-full bg-black/50 top-[62px] left-[15%] blur-[1px] animate-shadow z-[-1]"></div>
        <div className="shadow w-[20px] h-[4px] absolute rounded-full bg-black/50 top-[62px] left-[45%] blur-[1px] animate-shadow delay-[0.2s] z-[-1]"></div>
        <div className="shadow w-[20px] h-[4px] absolute rounded-full bg-black/50 top-[62px] right-[15%] blur-[1px] animate-shadow delay-[0.3s] z-[-1]"></div>
        <span className="absolute top-[75px] font-lato text-[20px] tracking-[12px] text-white left-[15%]">
          TEXT
        </span>
      </div>
    </div>
  );
};

export default Loading;
