import React, { useCallback, useEffect, useState } from 'react';
import css from './App.module.css';
import { TimeInput } from './components/TimeInput';
import moment, { Moment } from 'moment';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import { TimerProgress } from './components/TimerProgress';
import { getTimeInSeconds } from './helpers/getTimeInSeconds';

export const CountdownApp = () => {
    const [initialTime, setInitialTime] = useState<Moment | null>(null);
    const [time, setTime] = useState<Moment | null>(initialTime);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (isTimerRunning) {
            interval = setInterval(() => {
                setTime(moment(time).subtract(1, "seconds"));

                if (getTimeInSeconds(time) === 0) {
                    resetTimer();
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isTimerRunning, time]);

    const handleStartClick = () => {
        if (getTimeInSeconds(time) === 0) {
            resetTimer();
            return;
        }

        setIsTimerRunning(true);

        if (!initialTime) {
            setInitialTime(time);
        }
    };

    const handleStopClick = useCallback(() => {
        resetTimer();
    }, []);

    const handlePauseClick = useCallback(() => {
        setIsTimerRunning(false);
    }, []);

    const resetTimer = () => {
        setIsTimerRunning(false);
        setInitialTime(null);
        setTime(null);
    };

    const renderButtons = () => (
        <div className={css.buttonsContainer}>
            {isTimerRunning ? (
                <Button variant="outlined" color="warning" onClick={handlePauseClick}>
                    <PauseIcon />
                </Button>
            ) : (
                <Button variant="outlined" color="success" onClick={handleStartClick} disabled={!time?.isValid()}>
                    <PlayArrowIcon />
                </Button>
            )}
            <Button variant="outlined" color="error" onClick={handleStopClick} disabled={!time}>
                <StopIcon />
            </Button>
        </div>
    );

    return (
        <div className={css.container}>
            <TimerProgress initialValue={getTimeInSeconds(initialTime)} value={getTimeInSeconds(time)} />
            <TimeInput value={time} onChange={setTime} isDisabled={isTimerRunning} />
            {renderButtons()}
        </div>
    );
};
