import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import filterList from './filterList';

class StudyQualityGroupService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: {},
      schoolId: null,
      classId: null,
      total: computed(() => {
        if (!this.validateResponse()) return null;
        return Object.keys(this.data).reduce((acc, key) => (
          acc + filterList(this.data[key], this.schoolId).reduce((schoolAcc, school) => {
            if (school.classes) {
              return schoolAcc + filterList(school.classes, this.classId)
                .reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
            }
            return schoolAcc;
          }, 0)
        ), 0);
      }),
      higherThanFive: computed(() => {
        console.log('this.data', this.data);
        if (!this.validateResponse()) return null;
        const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => {
          if (this.data[key]) {
            return acc + filterList(this.data[key], this.schoolId).reduce((schoolAcc, school) => {
              if (school.classes) {
                return schoolAcc + filterList(school.classes, this.classId)
                  .reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
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
          acc + this.data[key].reduce((schoolAcc, school) => schoolAcc + school.schoolCount, 0)
        ), 0);
        return totalHigherThanFive / this.total;
      }),
      totalByGroup: computed(() => {
        const totals = Object.keys(this.data).map((key) => {
          if (this.data[key]) {
            return filterList(this.data[key], this.schoolId).reduce((schoolAcc, school) => {
              if (school.classes) {
                return schoolAcc + filterList(school.classes, this.classId)
                  .reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
              }
              return schoolAcc;
            }, 0);
          }
          return [];
        });
        return totals.map(total => ({
          value: total,
          rate: (total / this.total) * 100,
        }));
      }),
    });
  }

  init= action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

  validateResponse = () => Object.keys(this.data).length > 0;

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/study-quality-groups',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const studyQualityGroupService = new StudyQualityGroupService();

export default studyQualityGroupService;
