import { extendObservable, action } from 'mobx';
import { hashHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired, isValidEmail } from '../../../../core/validations';

class TeacherFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      teacherId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      password: [isRequired],
      company: localStorage.role === 'COMPANY_MANAGER' ? [] : [isRequired],
    };
  }

  handleLoad = action((teacherId) => {
    this.form.reset();
    if (teacherId) {
      this.fetch.fetch({
        url: `/teachers/${teacherId}`,
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
    this.teacherId = teacherId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      window.showErrorMessage('Fill the required fields');
      return;
    }
    const teacherId = this.form.getValue('id');
    this.submit.fetch({
      method: teacherId ? 'put' : 'post',
      url: teacherId ? `/teachers/${teacherId}` : '/teachers',
      body: {
        ...this.form.getValues(),
        company: this.form.getValue('company'),
      },
    }).then(() => {
      if (this.submit.data) {
        const teacher = this.submit.data;
        hashHistory.push(`/v2/teachers/${teacher.id}`);
        this.teacherId = teacher.id;
        this.form.reset();
        this.form.setInitialValues({
          ...teacher,
          company: teacher.company.id,
        });
        window.showSuccess(`Teacher ${teacherId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        window.showErrorMessage(`Error ${teacherId ? 'updating' : 'creating'} teacher.`);
      }
    });
  });
}

const teacherFormService = new TeacherFormService();

export default teacherFormService;
