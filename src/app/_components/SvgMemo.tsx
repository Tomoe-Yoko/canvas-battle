import React from "react";

export const SvgMemo = () => {
  return (
    <div>
      <div className="relative z-top-kv" style={{ opacity: 1 }}>
        {/* <svg
xmlns="http://www.w3.org/2000/svg"
width="1366"
height="768"
viewBox="0 0 1366 768"
class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[55%] w-full h-auto overflow-visible block"
> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={1366}
          height={768}
          viewBox="0 0 1366 768"
        >
          <defs>
            <mask id="maskLine" className="mask-line">
              <rect width="100%" height="100%" fill="black" />
              {/* 最初は全体を隠す */}
              <path
                className="mask-line"
                d="m167.15,580.29c128.89-40.88,263.17-85.41,358.32-200.9,30.52-37.04,56.88-82.55,65.1-136.94,1.29-8.53,2.06-17.8-.86-26.04-5.79-16.33-22.24-20.21-35.7-20.1-108.13.83-204.04,109.82-218.06,247.8-2.45,24.08-2.43,50.01,6.48,72.48,11.83,29.83,36.96,47.54,61.54,56.61,72.29,26.66,146.1-4.59,212.09-41.46,111.39-62.23,251-115.75,295.48-263.17-29-30.16-65.88,13.56-121.33,148.8-10.69,26.06-19.26,55.54-13.91,85.29,4.49,24.97,19.04,45.86,35.14,61.57,54.25,52.93,127.66,57.43,188.91,32.71,61.25-24.72,113.09-74.72,163.76-123.94"
              />
            </mask>
          </defs>
          <image
            href="img/kaki.jpg"
            width="100%"
            height="100%"
            mask="url(#maskLine)"
          />
        </svg>
      </div>
    </div>
  );
};
