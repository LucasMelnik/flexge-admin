import moment from 'moment';
import 'moment-duration-format';

export const formatTimeFromSeconds = (time, format = 'mm:ss') => `${time < 60 ? '00:' : ''}${moment.duration(time, 'seconds').format(format, { forceLength: true })}`;
