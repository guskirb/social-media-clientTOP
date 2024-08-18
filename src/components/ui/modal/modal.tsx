import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  setShowModal: (showModal: boolean) => void;
  children: ReactNode;
}

export default function Modal({ title, setShowModal, children }: ModalProps) {
  function closeModal(e: React.MouseEvent) {
    if (!(e.target as Element).classList.contains("modal_bg")) {
      return;
    }
    setShowModal(false);
  }

  return (
    <div
      className="flex justify-center items-center modal_bg fixed top-0 left-0 right-0 bottom-0 bg-[#00000098] z-10"
      onClick={closeModal}
    >
      <div className="w-5/6 rounded-xl bg-white lg:w-[680px] flex flex-col absolute">
        <div className="flex p-3">
          <p className="text-lg font-semibold">{title}</p>
          <div
            className="ml-auto cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <X
              size={24}
              color="#7a7a7a"
              className="hover:bg-gray-100 rounded-xl p-1"
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
