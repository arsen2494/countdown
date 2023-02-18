import { Moment } from 'moment';

export const getTimeInSeconds = (time: Moment | null) => {
    const minutesInSeconds = (time?.minutes() || 0) * 60;
    const seconds = time?.seconds() || 0;

    return minutesInSeconds + seconds;
}
