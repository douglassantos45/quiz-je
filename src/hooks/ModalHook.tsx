import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContexts';

export const useModal = () => {
  return useContext(ModalContext);
};
