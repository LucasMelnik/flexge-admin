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
      moment().year(newYear).startOf('year').format('YYYY-MM-DD'),
      moment().year(newYear).endOf('year').format('YYYY-MM-DD'),
    );
    AverageStudyQualityByPeriodService.load(
      moment().year(newYear).startOf('year').format('YYYY-MM-DD'),
      moment().year(newYear).endOf('year').format('YYYY-MM-DD'),
    );
  });
}

const historyListFilterService = new HistoryListFilterService();

export default historyListFilterService;
