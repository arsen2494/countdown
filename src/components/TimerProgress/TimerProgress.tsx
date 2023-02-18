import React from 'react';
import css from './TimerProgress.module.css';

interface TimerProgressProps {
    initialValue: number;
    value: number;
}

export const TimerProgress: React.FC<TimerProgressProps> = ({ initialValue, value }) => {
    const getHeight = (): number => {
        if (!value) {
            return 100;
        }

        return 100 - ((value * 100) / initialValue);
    };

    const layerStyle = {
        height: `${getHeight()}%`
    };
    
    return (
        <div className={css.timeProgress}>
            <div className={css.progressLayer} style={layerStyle}></div>
        </div>
    );
}
