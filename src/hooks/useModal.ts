import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalContextProvider");
  }

  return context;
};

export default useModal;
