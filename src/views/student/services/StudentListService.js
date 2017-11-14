import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import { isRequired } from '../../../core/validations';

class StudentListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      students: [],
      name: '',
      email: '',
      school: null,
      class: null,
      schoolId: null,
      classId: null,
      filteredStudents: null,
    });
    this.form.validations = {
      school: [isRequired],
    };
  }

  init = action((schoolId, classId) => {
    this.name = '';
    this.email = '';
    this.schoolId = schoolId;
    this.classId = classId;
    if (this.schoolId && this.classId) {
      this.loadBySchoolAndClass();
    } else {
      this.loadAllStudents();
    }
  });

  load = () => {
    if (!this.schoolId && !this.classId) {
      this.loadAllStudents();
    } else {
      this.loadBySchoolAndClass();
    }
  }

  loadAllStudents = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    this.fetch.fetch({
      url: '/students',
      query: {
        query: {
          ...this.form.getValue('name') && {
            name: {
              $regex: this.form.getValue('name'),
              $options: 'i',
            },
          },
          ...this.form.getValue('email') && {
            email: {
              $regex: this.form.getValue('email'),
              $options: 'i',
            },
          },
          ...this.form.getValue('school') && {
            school: this.form.getValue('school'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
      } else {
        this.students = [];
      }
    });
  });

  loadBySchoolAndClass = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes/${this.classId}/students`,
      query: {
        query: {
          ...this.form.getValue('name') && {
            name: {
              $regex: this.form.getValue('name'),
              $options: 'i',
            },
          },
          ...this.form.getValue('email') && {
            email: {
              $regex: this.form.getValue('email'),
              $options: 'i',
            },
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
      } else {
        this.students = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.students = this.filteredStudents.filter(student =>
      student.name.toLowerCase().search(value.toLowerCase()) !== -1);
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
