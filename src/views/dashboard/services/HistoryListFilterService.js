import { extendObservable, action } from 'mobx';
import moment from 'moment';
import WeekStatsByPeriodService from './WeekStatsByPeriodService';
import AverageStudyQualityByPeriodService from './AverageStudyQualityByPeriodService';

class HistoryListFilterService {
  constructor() {
    extendObservable(this, {
      year: moment().format('YYYY'),
    });
  }

  changeYear = action((newYear) => {
    this.year = newYear;
    WeekStatsByPeriodService.load(
      moment().year(newYear).startOf('year').toDate(),
      moment().year(newYear).endOf('year').toDate(),
    );
    AverageStudyQualityByPeriodService.load(
      moment().year(newYear).startOf('year').toDate(),
      moment().year(newYear).endOf('year').toDate(),
    );
  });
}

const historyListFilterService = new HistoryListFilterService();

export default historyListFilterService;
