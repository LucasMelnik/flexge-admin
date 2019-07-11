import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';

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

  resetMasteryTest = action((masteryId) => {
    this.fetch.fetch({
      url: `/students/${this.studentId}/mastery-tests/${masteryId}/reset`,
      method: 'put'
    }).then(() => {
      if (this.fetch.data) {
        this.loadMasteries();
        NotificationService.addNotification('Mastery Test successfully reset', 'success');
      } else {
        NotificationService.addNotification('Error to reset Mastery Test', 'error');
      }
    });
  });
}

const studentMasteryListService = new StudentMasteryListService();

export default studentMasteryListService;
