"use client";

import React, { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";

interface Props {
  isOpen: boolean;
  // onClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  // モーダル内部のクリックは伝播を防ぐ
  // const handleContentClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  // };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      closeTimeoutMS={300}
      ariaHideApp={false}
      className={`relative z-[99] h-screen w-screen bg-black/80`}
      overlayClassName="fixed inset-0 bg-black_main bg-opacity-60 flex items-center justify-center z-[99]"
    >
      <div
        className="flex size-full items-center justify-center"
        // onClick={handleContentClick}
      >
        <button
          className={`absolute right-0 top-0 z-[999] p-3`}
          onClick={onClose}
        >
          <IoMdClose className="mt-16 mr-4 text-[34px] fill-white" />
        </button>

        {children}
      </div>
    </ReactModal>
  );
};
