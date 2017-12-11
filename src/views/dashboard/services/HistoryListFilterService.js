import { extendObservable, action } from 'mobx';
import moment from 'moment';

class HistoryListFilterService {
  constructor() {
    extendObservable(this, {
      year: moment().year().format('YYYY'),
    });
  }

  changeYear = action((newYear) => { this.year = newYear });
}

const historyListFilterService = new HistoryListFilterService();

export default historyListFilterService;
