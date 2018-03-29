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
        this.contentsDetail = toJS(this.fetchContent.data).map(module => ({
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
        this.contents = this.fetchDates.data;
      } else {
        this.contents = [];
      }
    });
  });
}

const studentRecordDetailService = new StudentRecordDetailService();

export default studentRecordDetailService;
