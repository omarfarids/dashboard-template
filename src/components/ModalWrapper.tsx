import { useEffect } from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
  openModal: boolean;
  handleClose?: () => void;
  modalType?: string;
}
const ModalWrapper = ({
  openModal,
  children,
  handleClose,
  modalType = "my_modal_3",
}: ModalWrapperProps) => {
  useEffect(() => {
    if (openModal) {
      (document.getElementById(modalType) as HTMLDialogElement)?.showModal();
    } else {
      (document.getElementById(modalType) as HTMLDialogElement)?.close();
    }
  }, [openModal]);

  return (
    <>
      <dialog id={modalType} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default ModalWrapper;
