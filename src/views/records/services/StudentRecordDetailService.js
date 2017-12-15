import { action, extendObservable } from 'mobx';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';

class StudentRecordDetailService {
  fetchContent = new FetchService();
  fetchDates = new FetchService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      classId: null,
      courseId: null,
      contents: [],
      contentsDetail: [],
    });
  }

  generateAverageSpeecRecognitionScore = (result) => {
    if (result.items) {
      const scores = result.items.reduce(
        (acc, item) => [
          ...acc,
          ...item.attempts.map(attempt => (!Number.isNaN(parseInt(attempt.answer, 10)) ? parseInt(attempt.answer, 10) : 0))],
        [],
      );
      return round(scores.reduce((acc, score) => acc + score, 0) / scores.length);
    }
  };

  init = action((studentId) => {
    this.studentId = studentId;
  });

  handleContentFilterChange = action((courseId) => {
    this.courseId = courseId;
    this.loadByContent();
  });

  loadByContent = action(() => {
    this.fetchContent.fetch({
      url: `/records/students/${this.studentId}/courses/${this.courseId}/content-details`,
    }).then(() => {
      if (this.fetchContent.data) {
        this.contentsDetail = this.fetchContent.data.map(module => ({
          ...module,
          children: module.children.map(unit => ({
            ...unit,
            ...unit.docType === 'UNIT' && {
              conqueredPoints: unit.children.reduce((acc, result) => acc + result.points, 0),
              writingPoints: unit.type.abilities.find(ability => ability === 'WRITING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
              listeningPoints: unit.type.abilities.find(ability => ability === 'LISTENING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
              speakingPoints: unit.type.abilities.find(ability => ability === 'SPEAKING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
              readingPoints: unit.type.abilities.find(ability => ability === 'READING') ? (unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints) : 0,
              children: !unit.children[0].id ? null : unit.children.map(result => ({
                ...result,
                averageSpeechRecognitionScore: this.generateAverageSpeecRecognitionScore(result) || '',
              })),
            },
            ...unit.docType === 'MASTERY' && {
              conqueredPoints: 0,
              writingPoints: 0,
              listeningPoints: 0,
              speakingPoints: 0,
              readingPoints: 0,
            },
          })),
        }));

        this.contentsDetail = this.contentsDetail.map((module) => {
          const totalConquered = module.children.reduce((acc, unit) => acc + (unit.conqueredPoints || 0), 0);
          return {
            ...module,
            // moduleProgress: round(totalConquered / module.children.reduce((acc, unit) => {
            //   if (unit.docType === 'UNIT') {
            //     return acc + unit.defaultPoints + unit.firstReviewPoints + unit.secondReviewPoints;
            //   }
            //   return acc;
            // }, 0)),
            readingProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + (unit.readingPoints || 0), 0)),
            listeningProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + (unit.listeningPoints || 0), 0)),
            speakingProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + (unit.speakingPoints || 0), 0)),
            writingProgress: round(totalConquered / module.children.reduce((acc, unit) => acc + (unit.writingPoints || 0), 0)),
          };
        });
      } else {
        this.contentsDetail = [];
      }
    });
  });

  loadByDates = action((studentId) => {
    this.fetchDates.fetch({
      url: `/records/students/${studentId}/date-details`,
    }).then(() => {
      if (this.fetchDates.data) {
        this.contents = this.fetchDates.data.map(date => ({
          ...date,
          children: date.children.map(result => ({
            ...result,
            averageSpeechRecognitionScore: this.generateAverageSpeecRecognitionScore(result) || '',
          })),
        }));
      } else {
        this.contents = [];
      }
    });
  });
}

const studentRecordDetailService = new StudentRecordDetailService();

export default studentRecordDetailService;
