import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentMasteryListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      masteries: [],
      executions: [],
      studentId: '',
    });
  }

  init = action((studentId) => {
    this.masteries = [];
    this.executions = [];
    this.studentId = studentId;
    this.loadMasteries();
  });

  loadMasteries = action(() => {
    this.fetch.fetch({
      url: `/students/${this.studentId}/mastery-tests`,
    }).then(() => {
      if (this.fetch.data) {
        this.masteries = this.fetch.data;
      } else {
        this.masteries = [];
      }
    });
  });

  loadResults = action((masteryId) => {
    this.fetch.fetch({
      url: `/students/${this.studentId}/mastery-tests/${masteryId}/executions`,
    }).then(() => {
      if (this.fetch.data) {
        this.executions = this.fetch.data;
      } else {
        this.executions = [];
      }
    });
  });
}

const studentMasteryListService = new StudentMasteryListService();

export default studentMasteryListService;
