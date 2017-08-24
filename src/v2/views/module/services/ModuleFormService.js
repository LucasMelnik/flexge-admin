import { extendObservable, action } from 'mobx';
import { hashHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ModuleFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      moduleId: null,
    });
    this.form.validations = {
      name: [isRequired],
      course: [isRequired],
      academicPlan: [isRequired],
      group: [isRequired],
      order: [isRequired],
    };
  }

  handleLoad = action((moduleId) => {
    this.form.reset();
    if (moduleId) {
      this.fetch.fetch({
        url: `/modules/${moduleId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues({
            ...this.fetch.data,
            course: this.fetch.data.course.id,
            academicPlan: this.fetch.data.academicPlan.id,
          });
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.moduleId = moduleId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const moduleId = this.form.getValue('id');
    this.submit.fetch({
      method: moduleId ? 'put' : 'post',
      url: moduleId ? `/modules/${moduleId}` : '/modules',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        hashHistory.push(`/v2/modules`);
        NotificationService.addNotification(
          `Module ${moduleId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${moduleId ? 'updating' : 'creating'} module.`,
          null,
          null,
          'error',
        );
      }
    });
  })
}

const moduleFormService = new ModuleFormService();

export default moduleFormService;
