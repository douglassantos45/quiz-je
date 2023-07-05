import { useModal } from '../hooks/ModalHook';
import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  const { modalRef } = useModal();
  return (
    <div
      ref={modalRef}
      className="hidden fixed flex items-center justify-center inset-0 bg-black/70 w-screen h-screen overflow-hidden"
    >
      <div className="px-4">
        <div className="flex flex-col gap-10 max-w-4xl m-auto w-full bg-white p-5 md:p-10 rounded-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};
