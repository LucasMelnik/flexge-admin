import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

export default class StudentDetailAchievementListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      achievements: [],
    });
  }

  init = action((studentId) => {
    this.students = [];
    this.studentId = studentId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/records/students/${this.studentId}/achievements`,
    }).then(() => {
      if (this.fetch.data) {
        this.achievements = orderBy(this.fetch.data, 'achievedAt', 'asc');
      } else {
        this.achievements = [];
      }
    });
  });
}
