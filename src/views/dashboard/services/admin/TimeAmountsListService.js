import { action, extendObservable, toJS } from 'mobx';
import moment from 'moment';
import 'moment-duration-format';
import FetchService from '../../../../core/services/FetchService';

class TimeAmountsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      total: '00:00',
      average: '00:00',
    });
  }

  load = action((course) => {
    if (!course) return;

    this.fetch.fetch({
      url: `/stats/${course}/time`,
    }).then(() => {
      if (this.fetch.data) {
        const courseAmounts = toJS(this.fetch.data)[0] || { averageSeconds: 0, totalSeconds: 0 };

        this.average = `${courseAmounts.averageSeconds < 60 ? '00:' : ''}${moment.duration(courseAmounts.averageSeconds, "seconds").format("mm:ss")}`;
        this.total = `${courseAmounts.totalSeconds < 60 ? '00:' : ''}${moment.duration(courseAmounts.totalSeconds, "seconds").format("hh:mm:ss")}`;
      } else {
        this.total = '00:00';
        this.average = '00:00';
      }
    });
  });
}

const timeAmountsListService = new TimeAmountsListService();

export default timeAmountsListService;
