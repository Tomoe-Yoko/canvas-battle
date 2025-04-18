import React from "react";

export const EyeSvg = () => {
  return (
    <div>
      <svg viewBox="0 0 189 133" className="w-[200px]">
        <ellipse
          className="fill-white"
          cx="50.41"
          cy="65.49"
          rx="45.41"
          ry="54.01"
        />
        <ellipse
          className="fill-white"
          cx="137.56"
          cy="65.49"
          rx="45.41"
          ry="54.01"
        />
        {/* 左目 */}
        <ellipse cx="38.04" cy="69.79" rx="33.18" ry="41.12" fill="black">
          <animate
            attributeName="cx"
            values="38.04; 63.00; 63.00; 38.04"
            dur="2s"
            keyTimes="0; 0.3; 0.7; 1"
            begin="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        {/* 右目 */}
        <ellipse cx="128.79" cy="69.79" rx="33.18" ry="41.12">
          <animate
            attributeName="cx"
            values="128.79;153.00; 153.00; 128.79"
            dur="2s"
            keyTimes="0; 0.3; 0.7; 1"
            begin="2s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>
    </div>
  );
};
