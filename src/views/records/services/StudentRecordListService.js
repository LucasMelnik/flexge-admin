import { action, extendObservable } from 'mobx';
import moment from 'moment';
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
    });
  }

  init = action((schoolId, classId) => {
    this.students = [];
    this.schoolId = schoolId;
    this.classId = classId;
    this.form.setInitialValues({
      studiedTime: [moment().startOf('isoWeeks'), moment().endOf('isoWeeks')],
    });
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/records/schools/${this.schoolId}/school-classes/${this.classId}/students`,
      query: {
        studiedTimeFrom: this.form.getValue('studiedTime')[0].toDate(),
        studiedTimeTo: this.form.getValue('studiedTime')[1].toDate(),
      },
    }).then(() => {
      if (this.fetch.data) {
        const students = this.fetch.data.map(student => ({
          ...student,
          coursePercentage: round(
            (
              (student.conqueredPoints || 0) / student.availablePoints
            ) * 100
            , 2,
          ),
        }));

        this.fetchStudents.fetch({
          url: `/schools/${this.schoolId}/classes/${this.classId}/students`,
        }).then(() => {
          if (this.fetchStudents.data) {
            this.students = [
              ...students,
              ...this.fetchStudents.data.filter(student => !students.find(s => s.id === student.id)),
            ];
          }
        });
      } else {
        this.students = [];
      }
    });
  });
}

const studentRecordListService = new StudentRecordListService();

export default studentRecordListService;
