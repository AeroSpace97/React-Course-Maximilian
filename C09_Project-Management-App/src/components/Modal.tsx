import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";
import Button from "./Button.tsx";

interface ModalProps {
    children: React.ReactNode;
    buttonCaption?: string
}

export interface ModalRef {
    open: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current!.showModal();
        }
    }));

    return createPortal((
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {props.children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{props.buttonCaption || 'Close'}</Button>
            </form>
        </dialog>
    ), document.getElementById('modal-root')!);
})

export default Modal;