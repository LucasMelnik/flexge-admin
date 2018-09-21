import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

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
      modulePointRelevance: [isRequired],
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
            companyCountry: this.fetch.data.company.country,
            modulePointRelevance: this.fetch.data.modulePointRelevance || 1,
          };
          this.form.setInitialValues(data);
        }
      });
    } else {
      this.form.setInitialValues({
        company: this.companyId,
        modulePointRelevance: 1,
      });
    }
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

