"use client";
import React, { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean; // オプショナル
}

export const Modal: FC<Props> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      closeTimeoutMS={300}
      ariaHideApp={false}
      className={"relative z-[99] h-screen w-screen bg-black/80"}
      overlayClassName="fixed inset-0 bg-black_main bg-opacity-60 flex items-center justify-center z-[99]"
    >
      <div className="w-[90%] mx-auto">
        {showCloseButton && (
          <button
            className={`absolute right-0 top-0 z-[999] p-3`}
            onClick={onClose}
          >
            <IoMdClose className="mt-16 mr-4 text-[34px] fill-white" />
          </button>
        )}
        <div className="w-[90%] mx-auto h-screen flex items-center justify-center">
          {children}
        </div>
      </div>
    </ReactModal>
  );
};
