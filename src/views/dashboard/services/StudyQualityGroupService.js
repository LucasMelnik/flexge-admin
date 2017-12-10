import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudyQualityGroupService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studyQualityGroups: {},
      total: computed(() => {
        if (!this.validateResponse()) return null;
        return Object.keys(this.studyQualityGroups).reduce((acc, key) => {
          return acc + this.studyQualityGroups[key].reduce((schoolAcc, school) => {
            if (school.classes) {
              return schoolAcc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
            }
            return schoolAcc;
          }, 0);
        }, 0);
      }),
      higherThanFive: computed(() => {
        if (!this.validateResponse()) return null;
        const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => {
          if (this.studyQualityGroups[key]) {
            return acc + this.studyQualityGroups[key].reduce((schoolAcc, school) => {
              if (school.classes) {
                return schoolAcc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
              }
              return schoolAcc;
            }, 0);
          }
          return acc;
        }, 0);
        return totalHigherThanFive / this.total;
      }),
      higherThanFiveSchoolAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => (
          acc + this.studyQualityGroups[key].reduce((schoolAcc, school) => schoolAcc + school.schoolCount, 0)
        ), 0);
        return totalHigherThanFive / this.total;
      }),
      rates: computed(() => {
        const totals = Object.keys(this.studyQualityGroups).map((key) => {
          if (this.studyQualityGroups[key]) {
            return this.studyQualityGroups[key].reduce((schoolAcc, school) => {
              if (school.classes) {
                return schoolAcc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
              }
              return schoolAcc;
            }, 0);
          }
          return [];
        });
        return totals.map(total => total / this.total * 100);
      }),
    });
  }

  validateResponse = () => Object.keys(this.studyQualityGroups).length > 0;

  loadStudyQualityGroups = action(() => {
    this.fetch.fetch({
      url: '/reports/study-quality-groups',
    }).then(() => {
      if (this.fetch.data) {
        this.studyQualityGroups = this.fetch.data;
      }
    });
  });
}

const studyQualityGroupService = new StudyQualityGroupService();

export default studyQualityGroupService;
