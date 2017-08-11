import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../../core/validations';

class SchoolFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      name: [isRequired],
      company: localStorage.role === 'COMPANY_MANAGER' ? [] : [isRequired],
    };
  }

  handleLoad = action((schoolId) => {
    this.form.reset();
    if (schoolId) {
      this.fetch.fetch({
        url: `/schools/${schoolId}`,
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
      this.form.setInitialValues({ country: 'Brazil' });
    }
    this.schoolId = schoolId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      window.showErrorMessage('Fill the required fields');
      return;
    }
    const schoolId = this.form.getValue('id');
    this.submit.fetch({
      method: schoolId ? 'put' : 'post',
      url: schoolId ? `/schools/${schoolId}` : '/schools',
      body: {
        ...this.form.getValues(),
        company: this.form.getValue('company'),
      },
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        browserHistory.push(`/v2/schools/${school.id}`);
        this.schoolId = school.id;
        this.form.setInitialValues({
          ...school,
          company: this.form.getValue('company'),
        });
        window.showSuccess(`School ${schoolId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        window.showErrorMessage(`Error ${schoolId ? 'updating' : 'creating'} school.`);
      }
    });
  })
}

const schoolFormService = new SchoolFormService();

export default schoolFormService;
