import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class MoveUnitFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      unitId: null,
      moduleId: null,
    });
    this.form.validations = {
      course: [isRequired],
      module: [isRequired],
    };
  }

  handleLoad = action((unitId, moduleId) => {
    this.form.reset();
    this.form.setInitialValues({});
    this.moduleId = moduleId;
    this.unitId = unitId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    this.submit.fetch({
      method: 'patch',
      url: `/modules/${this.moduleId}/units/${this.unitId}/move`,
      body: {
        module: this.form.getValue('module'),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        this.form.setInitialValues({});
        browserHistory.push(`/modules/${this.submit.data.module.id}/details`);
        NotificationService.addNotification(
          'Unit successfully moved.',
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to move unit.',
          null,
          null,
          'error',
        );
      }
    });
  })
}
