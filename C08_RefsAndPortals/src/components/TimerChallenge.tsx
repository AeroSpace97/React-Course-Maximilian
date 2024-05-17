import React, {useRef} from "react";
import ResultModal, {DialogRef} from "./ResultModal.tsx";

interface TimerChallengeProps {
    title: string;
    targetTime: number;
}

const TimerChallenge: React.FC<TimerChallengeProps> = ({title, targetTime}) => {
    const timer = useRef<number>(0);
    const dialog = useRef<DialogRef>(null);

    const [timeRemaining, setTimeRemaining] = React.useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current!.open();
    }

    const handleReset = () => {
        setTimeRemaining(targetTime * 1000);
    }


    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    const handleStop = () => {
        dialog.current!.open();
        clearInterval(timer.current)
    }

    return (
        <>
            <ResultModal ref={dialog} timeRemaining={timeRemaining} targetTime={targetTime} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                {/*{timerExpired && <p>You lost!</p>}*/}
                <p className='challenge-time'>
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button
                        onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ?   'Stop':'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : ''}>
                    {timerIsActive ? 'Timer is running...' : 'Timer is inactive'}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge;