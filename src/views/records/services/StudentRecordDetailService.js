import { action, extendObservable, toJS } from 'mobx';
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
        const details = toJS(this.fetchContent.data).map(module => ({
          ...module,
          children: module.children.map(unit => ({
            ...unit,
            ...unit.docType === 'UNIT' && {
              conqueredWritingPoints: unit.type.abilities.find(ability => ability === 'WRITING') ? unit.children.reduce((acc, result) => acc + result.points, 0) : 0,
              conqueredListeningPoints: unit.type.abilities.find(ability => ability === 'LISTENING') ? unit.children.reduce((acc, result) => acc + result.points, 0) : 0,
              conqueredSpeakingPoints: unit.type.abilities.find(ability => ability === 'SPEAKING') ? unit.children.reduce((acc, result) => acc + result.points, 0) : 0,
              conqueredReadingPoints: unit.type.abilities.find(ability => ability === 'READING') ? unit.children.reduce((acc, result) => acc + result.points, 0) : 0,
              children: !unit.children.length ? null : unit.children.map(result => ({
                ...result,
                averageSpeechRecognitionScore: this.generateAverageSpeecRecognitionScore(result) || '',
              })),
            },
          })),
        }));

        this.contentsDetail = details.map(module => ({
          ...module,
          readingProgress: round((module.children.reduce((acc, unit) => acc + (unit.conqueredReadingPoints || 0), 0) / module.readingPoints) * 100),
          listeningProgress: round((module.children.reduce((acc, unit) => acc + (unit.conqueredListeningPoints || 0), 0) / module.listeningPoints) * 100),
          speakingProgress: round((module.children.reduce((acc, unit) => acc + (unit.conqueredSpeakingPoints || 0), 0) / module.speakingPoints) * 100),
          writingProgress: round((module.children.reduce((acc, unit) => acc + (unit.conqueredWritingPoints || 0), 0) / module.writingPoints) * 100),
        }));
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
