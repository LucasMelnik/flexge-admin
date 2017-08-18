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
    });
  }

  init = action((schoolId, classId) => {
    this.filter = '';
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schooldId}/classes/${this.classId}`,
      query: {
        query: {
          name: {
            $regex: this.form.getValue('filter'),
            $options: 'i',
          },
          ...this.form.getValue('company') && {
            company: this.form.getValue('company'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
      } else {
        this.students = [];
        this.total = 0;
      }
    });
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
          this.load();
        });
      });
  });
}

const studentListService = new StudentListService();

export default studentListService;
