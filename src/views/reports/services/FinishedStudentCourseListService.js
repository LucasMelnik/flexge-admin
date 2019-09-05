import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class FinishedStudentCourseListService {
  fetch = new FetchService();
  download = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      students: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
    this.form.validations = {
      school: [],
      schoolClass: [],
    };
  }

  init = action(() => {
    this.students = [];
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      this.form.setValue('school', localStorage.getItem('school'));
    }
  });

  load = action((pagination) => {
    if (pagination) {
      this.pagination.current = pagination.current;
    } else {
      this.pagination.current = 1;
    }

    this.form.submitted = true;
    this.fetch.fetch({
      url: '/reports/finished-student-course',
      query: {
        page: this.pagination.current,
        size: this.pagination.pageSize,
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
        this.students = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.students = [];
      }
    });
  });

  handleDownloadCertificate = action(studentCourse => {
    this.download
      .fetch({
        responseType: 'blob',
        url: `/students/${studentCourse.student}/courses/${studentCourse.course.id}/certificate`,
      })
      .then(() => {
        if (this.download.data) {
          const link = document.createElement('a');
          const fileUrl = window.URL.createObjectURL(this.download.data);
          link.href = fileUrl;

          link.download = 'course_certificate.pdf';
          link.click();
          setTimeout(() => window.URL.revokeObjectURL(fileUrl), 500);
        }
      });
  });
}

const finishedStudentCourseListService = new FinishedStudentCourseListService();

export default finishedStudentCourseListService;
