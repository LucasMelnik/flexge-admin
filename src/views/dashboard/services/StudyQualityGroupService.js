import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudyQualityGroupService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: {},
      schoolId: null,
      classId: null,
      total: computed(() => {
        if (!this.validateResponse()) return 0;
        return Object.keys(this.data).reduce((acc, key) => {
          return acc + this.data[key].reduce((schoolAcc, school) => {
            if (school.classes) {
              return schoolAcc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
            }
            return schoolAcc;
          }, 0);
        }, 0);
      }),
      higherThanFive: computed(() => {
        if (!this.validateResponse()) return 0;
        const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => {
          if (this.data[key]) {
            return acc + this.data[key].reduce((schoolAcc, school) => {
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
      higherThanFiveByClass: computed(() => {
        if (!this.validateResponse()) return 0;
        const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => {
          if (this.data[key]) {
            return acc + this.data[key]
              .filter(school => !this.scholId || school.id === this.schoolId)
              .reduce((schoolAcc, school) => {
                if (school.classes) {
                  return schoolAcc + school.classes
                    .filter(schoolClass => !this.classId || schoolClass.id === this.classId)
                    .reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
                }
                return schoolAcc;
              }, 0);
          }
          return acc;
        }, 0);

        const total = Object.keys(this.data).reduce((acc, key) => {
          return acc + this.data[key]
            .filter(school => !this.scholId || school.id === this.schoolId)
            .reduce((schoolAcc, school) => {
              if (school.classes) {
                return schoolAcc + school.classes
                  .filter(schoolClass => !this.classId || schoolClass.id === this.classId)
                  .reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
              }
              return schoolAcc;
            }, 0);
        }, 0);

        return totalHigherThanFive / total;
      }),
      higherThanFiveSchoolAverage: computed(() => {
        if (!this.validateResponse()) return 0;
        const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => (
          acc + this.data[key].reduce((schoolAcc, school) => schoolAcc + school.schoolCount, 0)
        ), 0);
        return totalHigherThanFive / this.total;
      }),
      rates: computed(() => {
        const totals = Object.keys(this.data).map((key) => {
          if (this.data[key]) {
            return this.data[key].reduce((schoolAcc, school) => {
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

  validateResponse = () => Object.keys(this.data).length > 0;

  init= action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

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
