import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';

export default class StudentGradeListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      students: [],
      evaluationPeriods: [],
    });
  }

  load = action((schoolId, schoolClassId) => {
    this.fetch.fetch({
      url: `/schools/${schoolId}/classes/${schoolClassId}`,
    }).then(() => {
      if (this.fetch.data) {
        const schoolClass = this.fetch.data;

        this.fetch.fetch({
          url: `/evaluation-templates/${schoolClass.evaluationTemplate}/periods`,
        }).then(() => {
          if (this.fetch.data) {
            this.evaluationPeriods = this.fetch.data;

            this.fetch.fetch({
              url: `/records/schools/${schoolId}/school-classes/${schoolClassId}/grades`,
            }).then(() => {
              if (this.fetch.data) {
                this.students = this.fetch.data;
              } else {
                this.students = [];
              }
            });
          } else {
            this.evaluationPeriods = [];
          }
        });
      }
    });
  });
}
