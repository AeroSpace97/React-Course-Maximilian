import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

interface ResultModalProps {
    onReset: () => void;
    targetTime: number;
    timeRemaining: number;
}

export interface DialogRef {
    open: () => void;
}


const ResultModal = forwardRef<DialogRef, ResultModalProps>(({timeRemaining, targetTime, onReset}, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    const userLost = timeRemaining <= 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - (timeRemaining / (targetTime * 1000))) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current!.showModal();
            }
        }
    })
    return createPortal(
        <dialog className="result-modal" ref={dialog} onClose={onReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>You stopped the timer with <strong>{formattedTimeRemaining} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
        , document.getElementById('modal')!)
})


export default ResultModal;