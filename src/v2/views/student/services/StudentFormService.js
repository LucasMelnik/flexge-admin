import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

class StudentFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      studentId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      company: localStorage.role === 'COMPANY_MANAGER' ? [] : [isRequired],
    };
  }

  handleLoad = action((studentId) => {
    this.form.reset();
    if (studentId) {
      this.fetch.fetch({
        url: `/students/${studentId}`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            company: this.fetch.data.company.id,
          };
          this.form.setInitialValues(data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.studentId = studentId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const studentId = this.form.getValue('id');
    this.submit.fetch({
      method: studentId ? 'put' : 'post',
      url: studentId ? `/students/${studentId}` : '/students',
      body: {
        ...this.form.getValues(),
        company: this.form.getValue('company'),
      },
    }).then(() => {
      if (this.submit.data) {
        const student = this.submit.data;
        browserHistory.push(`/students/${student.id}`);
        this.studentId = student.id;
        this.form.reset();
        this.form.setInitialValues(student);
        window.showSuccess(`Student ${studentId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        window.showErrorMessage(`Error ${studentId ? 'updating' : 'creating'} student.`);
      }
    });
  })
}

const studentFormService = new StudentFormService();

export default studentFormService;
