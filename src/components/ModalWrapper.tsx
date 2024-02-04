import { useEffect } from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
  openModal: boolean;
  handleClose?: () => void;
}
const ModalWrapper = ({
  openModal,
  children,
  handleClose,
}: ModalWrapperProps) => {
  useEffect(() => {
    if (openModal) {
      (document.getElementById("my_modal_3") as HTMLDialogElement)?.showModal();
    } else {
      (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
    }
  }, [openModal]);

  return (
    <>
      <dialog id="my_modal_3" className="modal">
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
