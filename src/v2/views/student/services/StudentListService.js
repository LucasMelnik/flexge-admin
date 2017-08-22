import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class StudentListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      students: [],
      filter: '',
      school: null,
      class: null,
      schoolId: null,
      classId: null,
      filteredStudents: null,
    });
  }

  init = action((schoolId, classId) => {
    this.filter = '';
    this.schoolId = schoolId;
    this.classId = classId;
    if (!this.schoolId && !this.classId) {
      this.loadAllStudents();
    } else {
      this.loadBySchoolAndClass();
    }
  });

  loadAllStudents = action(() => {
    this.fetch.fetch({
      url: '/students',
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
        this.filteredStudents = this.fetch.data;
      } else {
        this.students = [];
      }
    });
  });

  loadBySchoolAndClass = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes/${this.classId}`,
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        const school = this.fetch.data.school;
        this.students = this.fetch.data.students.map((student) => {
          const newStudent = Object.assign({}, student);
          newStudent.school = school;
          return newStudent;
        });
        this.filteredStudents = this.students;
      } else {
        this.students = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.students = this.filteredStudents.filter(student =>
      student.name.toLowerCase().search(value) !== -1);
  });

  handleRemove = action((student) => {
    ConfirmationDialogService.show(
      'Delete Student',
      `You are about to delete the student "${student.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/students/${student.id}`,
          method: 'delete',
        }).then(() => {
          if (!this.schoolId && !this.classId) {
            this.loadAllStudents();
          } else {
            this.loadBySchoolAndClass();
          }
        });
      });
  });
}

const studentListService = new StudentListService();

export default studentListService;
