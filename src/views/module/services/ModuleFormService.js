import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class ModuleFormService {
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
      readingPoints: [isRequired],
      listeningPoints: [isRequired],
      speakingPoints: [isRequired],
      writingPoints: [isRequired],
    };
  }

  handleLoad = action((moduleId) => {
    this.form.reset();
    if (moduleId) {
      this.fetch.fetch({
        url: `/modules/${moduleId}?verbose=true`,
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
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const moduleId = this.form.getValue('id');
    this.submit.fetch({
      method: moduleId ? 'put' : 'post',
      url: moduleId ? `/modules/${moduleId}` : '/modules',
      body: {
        ...this.form.getValues(),
        ...this.form.getValue('createdBy') && {
          createdBy: this.form.getValue('createdBy.id'),
        },
      },
    }).then(() => {
      if (this.submit.data) {
        browserHistory.push('/modules');
        NotificationService.addNotification(
          `Module ${moduleId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${moduleId ? 'updating' : 'creating'} module.`,
          'error',
        );
      }
    });
  })
}
