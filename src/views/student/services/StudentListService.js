import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class StudentListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      students: [],
      name: '',
      email: '',
      schoolId: null,
      classId: null,
      filteredStudents: null,
    });
    this.form.validations = {
      course: [
        (course, values) => {
          const isEmpty = !Object.keys(values).length ||
            Object.keys(values).reduce((acc, key) => {
              if (!acc) return acc;
              return !values[key];
            }, true);
          if (isEmpty) return 'Inform at least one field';
          return null;
        },
      ],
    };
  }

  init = action((schoolId, classId) => {
    this.name = '';
    this.email = '';
    this.schoolId = schoolId;
    this.classId = classId;
    this.students = [];
    if (classId) {
      this.load();
    }
  });

  load = action(() => {
    if (this.schoolId && this.classId) {
      this.loadBySchoolAndClass();
    } else {
      this.loadAllStudents();
    }
  });

  loadAllStudents = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    this.fetch.fetch({
      url: '/students',
      query: {
        query: {
          removedAt: null,
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

  handleDisable = action((student) => {
    ConfirmationDialogService.show(
      'Delete Student',
      `You are about to disable the student "${student.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: this.schoolId && this.classId ? `/schools/${this.schoolId}/classes/${this.classId}/students/${student.id}` : `/students/${student.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification('Student disabled', 'success');
          this.load();
        });
      });
  });

  handleRemove = action((student) => {
    ConfirmationDialogService.show(
      'Delete Student',
      `You are about to remove the student "${student.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: this.schoolId && this.classId ? `/schools/${this.schoolId}/classes/${this.classId}/students/${student.id}/remove` : `/students/${student.id}/remove`,
          method: 'post',
        }).then(() => {
          NotificationService.addNotification('Student removed', 'success');
          this.load();
        });
      });
  });
}

const studentListService = new StudentListService();

export default studentListService;
