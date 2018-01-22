import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import filterList from './filterList';

class StudiedTimeGroupService {
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
      totalByGroup: computed(() => {
        if (!this.validateResponse()) return null;
        const studentsCount = Object.keys(this.data).map((key) => {
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
        return studentsCount.map(studentCount => ({
          value: studentCount,
          rate: (studentCount / this.total) * 100,
        }));
      }),
      higherThanTwo: computed(() => {
        if (!this.validateResponse()) return null;
        const totalHigherThanTwo = filterList(this.data.excellent, this.schoolId)
          .reduce((acc, school) => {
            if (school.classes) {
              return acc + filterList(school.classes, this.classId)
                .reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
            }
            return acc;
          }, 0);
        return totalHigherThanTwo / this.total;
      }),
      higherThanTwoSchoolAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const totalHigherThanTwo = this.data.excellent.reduce((schoolAcc, school) => schoolAcc + school.schoolCount, 0)
        return totalHigherThanTwo / this.total;
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
      url: '/reports/studied-time-groups',
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const studiedTimeGroupService = new StudiedTimeGroupService();

export default studiedTimeGroupService;
