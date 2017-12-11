import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';

export default class StudentStudyQualityHistoryService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studyQualities: [],
    });
  }

  handleLoad = action((idStudent) => {
    const from = moment().startOf('year').toDate();
    const to = moment().endOf('year').toDate();
    this.fetch.fetch({
      url: `/reports/students/${idStudent}/average-study-quality-by-period?from=${from}&to=${to}&level=week`,
    }).then(() => {
      if (this.fetch.data) {
        this.studyQualities = this.fetch.data;
      } else {
        this.studyQualities = [];
      }
    });
  });
}
