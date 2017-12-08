import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ActiveStudentsByWeekService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      activeStudentsByWeek: [],
    });
  }

  load = action(() => {
    this.activeStudentsByWeek = [];
    this.fetch.fetch({
      url: '/reports/active-students-by-week',
    }).then(() => {
      if (this.fetch.data) {
        this.activeStudentsByWeek = this.fetch.data;
      }
    });
  });
}

const activeStudentsByWeekService = new ActiveStudentsByWeekService();

export default activeStudentsByWeekService;
