import moment from 'moment';
import 'moment-duration-format';

export const formatTimeFromSeconds = time => `${time < 60 ? '00:' : ''}${moment.duration(time, 'seconds').format('mm:ss', { forceLength: true })}`;
