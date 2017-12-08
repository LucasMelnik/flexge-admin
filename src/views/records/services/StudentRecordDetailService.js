import { action, extendObservable } from 'mobx';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';

class StudentRecordDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      classId: null,
      contents: [],
      contentsDetail: [],
    });
  }

  init = action((studentId) => {
    this.contents = [];
    this.contentsDetail = [];
    this.studentId = studentId;
    this.loadByDates();
    this.loadByContent();
  });

  loadByContent = action(() => {
    this.fetch.fetch({
      url: `/records/students/${this.studentId}/content-details`,
    }).then(() => {
      if (this.fetch.data) {
        this.contentsDetail = this.fetch.data.map(module => ({
          ...module,
          children: module.children.map(unit => ({
            ...unit,
            conqueredPoints: unit.children.reduce((acc, result) => acc + result.points, 0),
            writingPoints: unit.type.abilities.find(ability => ability === 'WRITING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
            listeningPoints: unit.type.abilities.find(ability => ability === 'LISTENING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
            speakingPoints: unit.type.abilities.find(ability => ability === 'SPEAKING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
            readingPoints: unit.type.abilities.find(ability => ability === 'READING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
          })),
        }));

        this.contentsDetail = this.contentsDetail.map((module) => {
          const totalConquered = module.children.reduce((acc, unit) => acc + unit.conqueredPoints, 0);
          return {
            ...module,
            moduleProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints, 0)),
            readingProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + unit.readingPoints, 0)),
            listeningProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + unit.listeningPoints, 0)),
            speakingProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + unit.speakingPoints, 0)),
            writingProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + unit.writingPoints, 0)),
          };
        });
      } else {
        this.contentsDetail = [];
      }
    });
  });

  loadByDates = action(() => {
    this.fetch.fetch({
      url: `/records/students/${this.studentId}/date-details`,
    }).then(() => {
      if (this.fetch.data) {
        this.contents = this.fetch.data;
      } else {
        this.contents = [];
      }
    });
  });
}

const studentRecordDetailService = new StudentRecordDetailService();

export default studentRecordDetailService;
