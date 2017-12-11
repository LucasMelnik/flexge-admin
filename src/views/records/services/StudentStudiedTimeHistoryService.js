import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';

export default class StudentStudiedTimeHistoryService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studiedTime: [],
    });
  }

  handleLoad = action((idStudent) => {
    const from = moment().startOf('year').toDate();
    const to = moment().endOf('year').toDate();
    this.fetch.fetch({
      url: `/reports/students/${idStudent}/week-stats-by-period?from=${from}&to=${to}`,
    }).then(() => {
      if (this.fetch.data) {
        this.studiedTime = this.fetch.data;
      } else {
        this.studiedTime = [];
      }
    });
  });
}
