import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentMasteryListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      masteries: [],
      executions: [],
      items: [],
      studentId: '',
    });
  }

  init = action((studentId) => {
    this.masteries = [];
    this.executions = [];
    this.items = [];
    this.studentId = studentId;
    this.loadMasteries();
  });

  loadMasteries = action(() => {
    this.fetch.fetch({
      url: `/students/${this.studentId}/mastery-tests?withDeleted=true`,
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
      url: `/students/${this.studentId}/mastery-tests/${masteryId}/executions?withDeleted=true`,
    }).then(() => {
      if (this.fetch.data) {
        this.executions = this.fetch.data;
      } else {
        this.executions = [];
      }
    });
  });

  loadItems = action((masteryId, executionId) => {
    this.fetch.fetch({
      url: `/students/${this.studentId}/mastery-tests/${masteryId}/executions/${executionId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });
}

const studentMasteryListService = new StudentMasteryListService();

export default studentMasteryListService;
