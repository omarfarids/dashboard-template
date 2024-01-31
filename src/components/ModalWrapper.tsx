interface ModalWrapperProps {
  button: any;
  children: React.ReactNode;
}
const ModalWrapper = ({ button: Button, children }: ModalWrapperProps) => {
  return (
    <>
      <Button
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      />

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
