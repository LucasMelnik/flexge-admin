import {action, computed, extendObservable} from 'mobx';
import isFinite from 'lodash/isFinite';
import FetchService from '../../../core/services/FetchService';
import filterList from './filterList';
import get from 'lodash/get';

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

        const rate = (totalHigherThanFive / this.total) * 100;
        return isFinite(rate) ? rate : 0;
      }),
      higherThanFiveSchoolAverage: computed(() => {
        if (!this.validateResponse()) return null;
        const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => (
          acc + this.data[key].reduce((schoolAcc, school) => schoolAcc + school.schoolCount, 0)
        ), 0);
        const rate = (totalHigherThanFive / this.total) * 100;
        return isFinite(rate) ? rate : 0;
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
        return totals.map((total, index) => ({
          value: total,
          rate: (total / this.total) * 100,
          details: filterList(this.data[Object.keys(this.data)[index]], this.schoolId)
            .reduce((schoolAcc, school) => [...schoolAcc, ...get(school, 'classes', []).reduce((acc, item) => [...acc, ...item.students], [])], [])
            .map(item => ({
              ...item,
              value: item.score,
            })),
        }));
      }),
    });
  }

  init= action((schoolId, classId, query) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load(query);
  });

  validateResponse = () => Object.keys(this.data).length > 0;

  load = action((query) => {
    this.fetch.fetch({
      url: '/reports/study-quality-groups',
      query
    }).then(() => {
      if (this.fetch.data) {
        this.data = this.fetch.data;
      }
    });
  });
}

const studyQualityGroupService = new StudyQualityGroupService();

export default studyQualityGroupService;
