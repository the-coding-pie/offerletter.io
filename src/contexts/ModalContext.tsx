import { createContext, ReactNode, useCallback, useState } from "react";
import { ModalObj } from "../types/interfaces";

interface Props {
  children: ReactNode;
}

interface ModalState {
  modal: ModalObj | null;
  showModal: (modal: ModalObj) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalState | undefined>(undefined);

const ModalContextProvider = ({ children }: Props) => {
  const [modal, setModal] = useState<ModalObj | null>(null);

  const showModal = useCallback((modal: ModalObj) => {
    setModal(modal);
  }, []);

  const hideModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modal,
        showModal,
        hideModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
