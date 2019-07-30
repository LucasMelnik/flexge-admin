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
      schoolId: null,
      classId: null,
      filteredStudents: null,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
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
    this.schoolId = schoolId;
    this.classId = classId;
    this.students = [];
    this.form.setInitialValues({});
    if (classId) {
      this.load();
    }
  });

  load = action(() => {
    if (this.schoolId && this.classId) {
      this.pagination = null;
      this.loadBySchoolAndClass();
    } else {
      this.pagination = {
        current: 1,
        total: 0,
        pageSize: 50,
      };
      this.loadAllStudents();
    }
  });

  loadAllStudents = action((page) => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification(
        'Please inform at least one filter',
        'error',
      );
      return;
    }
    if (page) {
      this.pagination.current = page.current;
    }
    this.fetch.fetch({
      url: '/students',
      query: {
        query: {
          onlyRemoved: false,
          verbose: 'true',
          page: page ? page.current - 1 : 0,
          size: this.pagination.pageSize,
          ...this.form.getValue('name') && {
            name: this.form.getValue('name'),
          },
          ...this.form.getValue('email') && {
            email: this.form.getValue('email'),
          },
          ...this.form.getValue('cpf') && {
            cpf: this.form.getValue('cpf'),
          },
          ...this.form.getValue('school') && {
            school: this.form.getValue('school'),
          },
          ...this.form.getValue('schoolClass') && {
            schoolClass: this.form.getValue('schoolClass'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
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
          verbose: 'true',

          ...this.form.getValue('name') && {
            name: this.form.getValue('name'),
          },
          ...this.form.getValue('email') && {
            email: this.form.getValue('email'),
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

  handleRestore = action((student) => {
    ConfirmationDialogService.show(
      'Enable Student',
      `You are about to enable the student "${student.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/schools/${this.schoolId}/classes/${this.classId}/students/${student.id}/restore`,
          method: 'post',
        }).then(() => {
          NotificationService.addNotification('Student enable.', 'success');
          this.load();
        });
      });
  });
}

const studentListService = new StudentListService();

export default studentListService;
