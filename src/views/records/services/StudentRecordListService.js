import { action, extendObservable } from 'mobx';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class StudentRecordListService {
  fetch = new FetchService();
  form = new FormService();
  fetchStudents = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      classId: null,
      students: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 100,
      }
    });
  }

  init = action((schoolId, classId) => {
    this.students = [];
    this.schoolId = schoolId;
    this.classId = classId;
    this.pagination = {
      current: 1,
      total: 0,
      pageSize: 100,
    };
    this.form.setInitialValues({
      isCustomPeriod: false,
      studiedTime: [],
    });
    this.load();
  });

  filter = action(() => this.load({ current: 1 }));

  load = action((page) => {
    if (page) {
      this.pagination.current = page.current;
    }
    this.fetch.fetch({
      url: `/records/schools/${this.schoolId}/school-classes/${this.classId}/students`,
      query: {
        page: this.pagination.current - 1,
        size: this.pagination.pageSize,
        ...this.form.getValue('isCustomPeriod') && {
          studiedTimeFrom: this.form.getValue('studiedTime')[0].toDate(),
          studiedTimeTo: this.form.getValue('studiedTime')[1].toDate(),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.pagination.total = this.fetch.data.total;
        this.students = this.fetch.data.docs.map(student => ({
          ...student,
          coursePercentage: round(
            (
              (student.conqueredPoints || 0) / student.availablePoints
            ) * 100
            , 2,
          ),
        }));
      } else {
        this.students = [];
      }
    });
  });
}

const studentRecordListService = new StudentRecordListService();

export default studentRecordListService;
