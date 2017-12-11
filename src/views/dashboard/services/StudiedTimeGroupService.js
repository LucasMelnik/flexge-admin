import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudiedTimeGroupService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      data: {},
      total: computed(() => {
        if (!this.validateResponse()) return null;
        return Object.keys(this.data).reduce((acc, key) => {
          return acc + this.data[key].reduce((schoolAcc, school) => {
            if (school.classes) {
              return schoolAcc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
            }
            return schoolAcc;
          }, 0);
        }, 0);
      }),
      totalByGroup: computed(() => {
        if (!this.validateResponse()) return null;
        const studentsCount = Object.keys(this.data).map((key) => {
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
        return studentsCount.map(count => count / this.total * 100);
      }),
      higherThanTwo: computed(() => {
        if (!this.validateResponse()) return null;
        const totalHigherThanTwo = this.data.excellent.reduce((acc, school) => {
          if (school.classes) {
            return acc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
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
