import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired, isValidEmail } from '../../../core/validations';

class UserFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      userId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      role: [isRequired],
    };
  }

  handleLoad = action((userId, companyId) => {
    this.form.reset();
    if (userId) {
      this.fetch.fetch({
        url: `/users/${userId}`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            company: companyId,
          };
          this.form.setInitialValues(data);
        }
      });
    } else {
      this.form.setInitialValues({ company: companyId });
    }
    this.userId = userId;
  });

  handleSubmit = action(() => {
    this.form.validations = {
      ...this.form.validations,
      school: this.form.getValue('role') === 'ADMIN' || this.form.getValue('role') === 'IMAGE_ADMIN' || this.form.getValue('role') === 'CONTENT_ADMIN' || this.form.getValue('role') === 'DISTRIBUTOR_MANAGER' || this.form.getValue('role') === 'COMPANY_MANAGER' || this.form.getValue('role') === 'AUDIO_CONTENT' ? [] : [isRequired],
      company: this.form.getValue('role') === 'ADMIN' || this.form.getValue('role') === 'IMAGE_ADMIN' || this.form.getValue('role') === 'CONTENT_ADMIN' || this.form.getValue('role') === 'DISTRIBUTOR_MANAGER' || this.form.getValue('role') === 'AUDIO_CONTENT' ? [] : [isRequired],
    };
    this.form.submitted = true;
    if (this.form.errors) {
      window.showErrorMessage('Fill the required fields');
      return;
    }
    const userId = this.form.getValue('id');
    this.submit.fetch({
      method: userId ? 'put' : 'post',
      url: userId ? `/users/${userId}` : '/users',
      body: {
        ...this.form.getValues(),
        ...this.form.getValue('company') && {
          company: this.form.getValue('company'),
        },
      },
    }).then(() => {
      if (this.submit.data) {
        const user = this.submit.data;
        if (user.role === 'ADMIN' || user.role === 'CONTENT_ADMIN' || user.role === 'IMAGE_ADMIN' || user.role === 'AUDIO_CONTENT') {
          browserHistory.push(`/admin-users/${user.id}`);
        } else if (user.role === 'DISTRIBUTOR_MANAGER') {
          browserHistory.push(`/companies/${user.company.id}/distributor-users/${user.id}`);
        } else {
          browserHistory.push(`/companies/${user.company.id}/users/${user.id}`);
        }
        this.userId = user.id;
        this.form.reset();
        this.form.setInitialValues({
          ...user,
          ...user.company && user.company.id && {
            company: user.company.id,
          }
        });
        window.showSuccess(`User ${userId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        window.showErrorMessage(`Error ${userId ? 'updating' : 'creating'} user.`);
      }
    });
  });
}

const userFormService = new UserFormService();

export default userFormService;
