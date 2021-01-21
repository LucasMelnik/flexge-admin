import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import { MASTERTEST_DISTRIBUTOR_ID } from '../../../core/consts';

export default class SchoolFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      name: [isRequired],
      company: [isRequired],
      region: [isRequired],
      state: [isRequired],
      locale: [isRequired],
      allowLevelSelection: [isRequired],
    };
  }

  init = action((schoolId, companyId) => {
    this.schoolId = schoolId;
    this.companyId = companyId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    this.form.reset();
    if (this.schoolId) {
      this.fetch.fetch({
        url: `/schools/${this.schoolId}`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            company: this.fetch.data.company.id,
            country: this.fetch.data.company.country,
            companyDistributor: this.fetch.data.company.distributor,
            allowLevelSelection: this.fetch.data.allowLevelSelection || false,
          };
          this.form.setInitialValues(data);
          if (this.fetch.data.company.distributor === MASTERTEST_DISTRIBUTOR_ID) {
            this.addInepToRequired();
          }
        }
      });
    } else {
      if (this.companyId) {
        this.fetch.fetch({
          url: `/companies/${this.companyId}`,
        }).then(() => {
          if (this.fetch.data) {
            this.form.setInitialValues({
              company: this.fetch.data.id,
              country: this.fetch.data.country,
              locale: this.fetch.data.country.locale,
              allowLevelSelection: false,
            });
            if (this.fetch.data.distributor === MASTERTEST_DISTRIBUTOR_ID) {
              this.addInepToRequired();
            }
          }
        });
      } else {
        this.form.setInitialValues({
          allowLevelSelection: false
        });
      }
    }
  });

  addInepToRequired = action(() => {
    this.form.validations.inep = [isRequired];
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const schoolId = this.form.getValue('id');
    this.submit.fetch({
      method: schoolId ? 'put' : 'post',
      url: schoolId ? `/schools/${schoolId}` : '/schools',
      body: {
        ...this.form.getValues(),
        ...this.form.getValue('logoUrl') && {
          logoUrl: this.form.getValue('logoUrl'),
        },
        company: this.form.getValue('company'),
      },
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        this.schoolId = school.id;
        this.form.setInitialValues({
          ...school,
          company: this.form.getValue('company'),
          companyCountry: this.form.getValue('companyCountry'),
        });
        NotificationService.addNotification(`School ${schoolId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${schoolId ? 'updating' : 'creating'} school.`, 'error');
      }
    });
  })
}

