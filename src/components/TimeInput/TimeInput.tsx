import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import css from './TimeInput.module.css';
import { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

interface TimeInputProps {
    value: Moment | null;
    onChange: (newValue: Moment | null) => void;
    isDisabled?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, isDisabled }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
                className={css.timePicker}
                ampm={false}
                disableOpenPicker
                views={['minutes', 'seconds']}
                inputFormat="mm:ss"
                mask="__:__"
                label="Minutes and seconds"
                value={value}
                onChange={onChange}
                disabled={isDisabled}
                renderInput={(params: TextFieldProps) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
