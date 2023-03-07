import { ModalTypes } from "./enums";

export interface ModalObj {
  modalType: ModalTypes;
  modalProps?: object;
  modalTitle?: string;
  hideCloseBtn?: boolean;
  bgColor?: string;
  textColor?: string;
}
