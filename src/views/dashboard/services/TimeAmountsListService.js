import { action, extendObservable, toJS } from 'mobx';
import range from 'lodash/range';
import FetchService from '../../../core/services/FetchService';

class TimeAmountsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      timeAmounts: [],
      average: 0,
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: `/stats/${localStorage.getItem('id')}/time`,
    }).then(() => {
      if (this.fetch.data) {
        const teacherAmounts = toJS(this.fetch.data);
        this.timeAmounts = range(1, 21).map(time => {
          return {
            time,
            amount: (teacherAmounts.find(teacherAmount => teacherAmount.id === time) || {}).amount || 0
          }
        });

        const totalTime = this.timeAmounts.reduce((acc, timeAmount) => acc + (timeAmount.time * timeAmount.amount), 0);
        const totalAmount = this.timeAmounts.reduce((acc, timeAmount) => acc + timeAmount.amount, 0);
        this.average = totalTime / totalAmount;
      } else {
        this.timeAmounts = [];
      }
    });
  });
}

const timeAmountsListService = new TimeAmountsListService();

export default timeAmountsListService;
