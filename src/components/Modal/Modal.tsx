import React, { useCallback, useEffect } from "react";
import useModal from "../../hooks/useModal";
import { ModalTypes } from "../../types/enums";
import useEscKey from "../../hooks/useEscKey";
import { ModalObj } from "../../types/interfaces";
import PlaceholderModal from "../ModalComponents/PlaceholderModal";
import TemplateModal from "../ModalComponents/TemplateModal";

const Modal = ({
  modalType,
  modalProps,
  modalTitle,
  bgColor,
  textColor,
  hideCloseBtn = false,
}: ModalObj) => {
  const { hideModal } = useModal();

  const handleClose = useCallback(() => hideModal(), [hideModal]);

  useEscKey(() => handleClose());

  let Component: React.FC<any> | null = null;

  switch (modalType) {
    case ModalTypes.PLACEHOLDER_MODAL:
      Component = PlaceholderModal;
      break;
    case ModalTypes.TEMPLATE_MODAL:
      Component = TemplateModal;
      break;
    default:
      Component = null;
  }

  //   disable scroll bar
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div
      className="backdrop fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-30"
      style={{
        maxHeight: "100vh",
      }}
    >
      <div className="outer-wrapper flex flex-col items-center w-full absolute top-16">
        <div
          className={`modal rounded-xl relative flex flex-col w-auto`}
          style={{
            maxWidth: "60rem",
            background: bgColor ? bgColor : "#ffffff",
            color: textColor ? textColor : "inherit",
          }}
        >
          {!hideCloseBtn && (
            <button
              onClick={handleClose}
              type="button"
              className="modal__close-btn absolute z-20 top-4 right-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          {modalTitle && (
            <div className="modal__title">
              <h3 className="text-base font-semibold p-4 pb-2">{modalTitle}</h3>
            </div>
          )}

          <div className={`w-full ${!hideCloseBtn ? "pr-4" : ""}`}>
            {/* desctucturing undefinded value inside object, it will ignore */}

            {Component !== null && <Component {...modalProps} />}
          </div>
        </div>
        <div className="empty-space pb-14"></div>
      </div>
    </div>
  );
};

export default Modal;
