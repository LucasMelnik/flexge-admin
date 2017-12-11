import { action, extendObservable } from 'mobx';
import moment from 'moment';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';
import HistoryListFilterService from '../../dashboard/services/HistoryListFilterService';

export default class StudentHistoryRecordDetailService {
  fetchStudiedTime = new FetchService();

  constructor() {
    extendObservable(this, {
      studiedTime: [],
    });
  }

  handleLoad = action((idStudent) => {
    const from = moment().startOf('year').toDate();
    const to = moment().endOf('year').toDate();
    this.fetchStudiedTime.fetch({
      url: `/reports/students/${idStudent}/week-stats-by-period?from=${from}&to=${to}`,
    }).then(() => {
      if (this.fetchStudiedTime.data) {
        this.studiedTime = this.fetchStudiedTime.data;
      } else {
        this.student = {};
      }
    });
  });
}
