import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class KidsCertificateListService {
  fetch = new FetchService();
  download = new FetchService();
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

  handleDownloadCertificate = action(studentModule => {
    this.download
      .fetch({
        responseType: 'blob',
        url: `/students/${studentModule.student}/courses/${studentModule.module.course.id}/modules/${studentModule.module.id}/certificate`,
      })
      .then(() => {
        if (this.download.data) {
          const link = document.createElement('a');
          const fileUrl = window.URL.createObjectURL(this.download.data);
          link.href = fileUrl;

          link.download = 'module_certificate.pdf';
          link.click();
          setTimeout(() => window.URL.revokeObjectURL(fileUrl), 500);
        }
      });
  });
}

const kidsCertificateListService = new KidsCertificateListService();

export default kidsCertificateListService;
