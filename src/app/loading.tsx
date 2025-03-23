import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div aria-label="Now Loading...">
      <Skeleton />
    </div>
  );
};

export default Loading;
