import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

export default class UserFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

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

  handleLoad = action((userId, companyId, distributorId, type) => {
    this.form.reset();
    if (userId) {
      this.fetch.fetch({
        url: `/users/${userId}`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            ...companyId && {
              company: companyId,
            },
            ...distributorId && {
              distributor: distributorId,
            },
            ...this.fetch.data.company && {
              company: this.fetch.data.company.id,
            },
            ...this.fetch.data.school && {
              school: this.fetch.data.school.id,
            },
          };
          this.form.setInitialValues(data);
        }
      });
    } else {
      this.form.setInitialValues({
        ...localStorage.getItem('company') && {
          company: localStorage.getItem('company'),
        },
        ...distributorId && {
          distributor: distributorId,
        },
        ...(type && type === 'DISTRIBUTOR') && {
          role: 'DISTRIBUTOR_MANAGER',
        },
      });
    }
    this.userId = userId;
  });

  handleSubmit = action(() => {
    this.form.validations = {
      ...this.form.validations,
      distributor: this.form.getValue('role') === 'DISTRIBUTOR_MANAGER' ? [isRequired] : [],
      company: this.form.getValue('role') === 'COMPANY_MANAGER' ? [isRequired] : [],
      school: (this.form.getValue('role') === 'SCHOOL_MANAGER' || this.form.getValue('role') === 'TEACHER') ? [isRequired] : [],
    };
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
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
        if (
          user.role === 'ADMIN' ||
          user.role === 'CONTENT_ADMIN' ||
          user.role === 'IMAGE_ADMIN' ||
          user.role === 'AUDIO_CONTENT' ||
          user.role === 'CERTIFICATION_TEST_PROFESSIONAL'
        ) {
          browserHistory.replace(`/admin-users/${user.id}`);
        } else if (user.role === 'DISTRIBUTOR_MANAGER') {
          browserHistory.replace(`/distributors-users/${user.id}`);
        } else {
          browserHistory.replace(`/company-users/${user.id}`);
        }
        this.userId = user.id;
        this.form.reset();
        this.form.setInitialValues({
          ...user,
          ...user.company && user.company.id && {
            company: user.company.id,
          },
        });
        NotificationService.addNotification(
          `User ${userId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        if (this.submit.error && this.submit.error.indexOf('E11000') > -1) {
          NotificationService.addNotification(
            'We already have an user with this email.',
            'error',
          );
        } else {
          NotificationService.addNotification(this.submit.error, 'error');
        }
      }
    });
  });
}
