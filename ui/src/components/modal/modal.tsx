import { PropsWithChildren } from 'react';

interface ModalProps {
  open: boolean,
  confirmationBtnText?: string
  onClose: VoidFunction,
  onConfirmationBtnClick?: VoidFunction,
  onCancelBtnClick: VoidFunction,
}

function Modal({
  open, onClose, onConfirmationBtnClick, onCancelBtnClick, confirmationBtnText, children,
}: PropsWithChildren<ModalProps>) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors 
      ${open ? 'visible bg-black/50' : 'invisible'}`}
    >
      <div
        onClick={(e) => { e.stopPropagation(); }}
        className={`bg-color-modal-background rounded-xl shadow p-6 transition-all
        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-2 p-1 rounded-lg"
        >
          <p className="text-2xl font-mono font-extrabold font text-gray-500">X</p>
        </button>
        {children}
        <div className="flex w-full flex-row space-x-3 mt-1">
          <button
            onClick={onCancelBtnClick}
            type="button"
            className="text-primary-text-color bg-secondary-color/80
            hover:bg-secondary-color/90 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Cancel
          </button>
          {(onConfirmationBtnClick && confirmationBtnText)
            && (
            <button
              onClick={onConfirmationBtnClick}
              type="button"
              className="text-primary-text-color bg-primary-color/80
              hover:bg-primary-color/90 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
            >
              {confirmationBtnText}
            </button>
            )}
        </div>
      </div>

    </div>
  );
}

export default Modal;
