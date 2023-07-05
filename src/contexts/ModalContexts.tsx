import { ReactNode, RefObject, createContext, useRef } from 'react';

type ModalContextProps = {
  modalRef: RefObject<HTMLDivElement>;
  close: () => void;
  open: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps,
);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const open = () => {
    if (!modalRef?.current) return;
    modalRef.current.classList.remove('hidden');
  };

  const close = () => {
    if (!modalRef?.current) return;
    modalRef.current.classList.add('hidden');
  };

  return (
    <ModalContext.Provider value={{ modalRef, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};
