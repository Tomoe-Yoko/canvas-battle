import React from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div aria-label="Now Loading..." className="w-[80%] h-[60vh] mx-auto">
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
        <div className="circle w-[15px] h-[15px] absolute rounded-full bg-white left-[16%] animate-circle"></div>
        <div className="circle w-[15px] h-[15px] absolute rounded-full bg-white left-[40%] animate-circle delay-[0.2s]"></div>
        <div className="circle w-[15px] h-[15px] absolute rounded-full bg-white right-[28%] animate-circle delay-[0.3s]"></div>
        <div className="shadow w-[15px] h-[4px] absolute rounded-full bg-black/50 top-[62px] left-[16%] blur-[1px] animate-shadow z-[-1]"></div>
        <div className="shadow w-[15px] h-[4px] absolute rounded-full bg-black/50 top-[62px] left-[40%] blur-[1px] animate-shadow delay-[0.2s] z-[-1]"></div>
        <div className="shadow w-[15px] h-[4px] absolute rounded-full bg-black/50 top-[62px] right-[28%] blur-[1px] animate-shadow delay-[0.3s] z-[-1]"></div>
        <span className="absolute top-[75px] font-lato text-[16px] tracking-[5px] text-white left-[15%]">
          LOADING...
        </span>
      </div>
    </div>
  );
};

export default Loading;
