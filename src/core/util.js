import moment from 'moment';
import 'moment-duration-format';

export const formatTimeFromSeconds = (time, format = 'mm:ss') => moment.duration(time, 'seconds').format(format, { trim: false });
