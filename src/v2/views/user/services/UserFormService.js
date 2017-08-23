import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired, isValidEmail } from '../../../../core/validations';

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
      school: this.form.getValue('role') === 'DISTRIBUTOR_MANAGER' || this.form.getValue('role') === 'COMPANY_MANAGER' ? [] : [isRequired],
      company: this.form.getValue('role') === 'DISTRIBUTOR_MANAGER' ? [] : [isRequired],
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
        company: this.form.getValue('company'),
      },
    }).then(() => {
      if (this.submit.data) {
        const user = this.submit.data;
        this.userId = user.id;
        this.form.reset();
        this.form.setInitialValues({
          ...user,
          company: user.company.id,
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
