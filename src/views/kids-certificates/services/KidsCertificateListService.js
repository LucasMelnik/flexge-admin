import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class KidsCertificateListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      modules: [],
    });
    this.form.validations = {
      school: [],
      schoolClass: [],
    };
  }

  init = action(() => {
    this.modules = [];
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      this.form.setValue('school', localStorage.getItem('school'));
    }
  });

  load = action(() => {
    this.form.submitted = true;
    this.fetch.fetch({
      url: '/reports/finished-student-module',
      query: {
        ...this.form.getValue('school') && {
          school: this.form.getValue('school'),
        },
        ...this.form.getValue('schoolClass') && {
          schoolClass: this.form.getValue('schoolClass'),
        },
        ...this.form.getValue('from') && {
          from: this.form.getValue('from').toDate(),
        },
        ...this.form.getValue('to') && {
          to: this.form.getValue('to').toDate(),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.modules = this.fetch.data;
      } else {
        this.modules = [];
      }
    });
  });

}

const kidsCertificateListService = new KidsCertificateListService();

export default kidsCertificateListService;
