import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class UnitFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      unitId: null,
    });
    this.form.validations = {
      name: [isRequired],
      module: [isRequired],
      type: [isRequired],
      group: [isRequired],
      order: [isRequired],
      scoreToPass: [isRequired],
      difficulty: [isRequired],
    };
  }

  handleLoad = action((unitId, moduleId, academicPlanId) => {
    this.form.reset();
    if (unitId) {
      this.fetch.fetch({
        url: `/modules/${moduleId}/units/${unitId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues({
            ...this.fetch.data,
            module: this.fetch.data.module.id,
            academicPlan: this.fetch.data.module.academicPlan.id,
            type: this.fetch.data.type.id,
          });
        }
      });
    } else {
      this.form.setInitialValues({
        module: moduleId,
        academicPlan: academicPlanId,
      });
    }
    this.unitId = unitId;
  });

  handleSubmit = action((callbackAfterSuccess) => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const unitId = this.form.getValue('id');
    const moduleId = this.form.getValue('module');
    this.submit.fetch({
      method: unitId ? 'put' : 'post',
      url: unitId ? `/modules/${moduleId}/units/${unitId}` : `/modules/${moduleId}/units`,
      body: {
        ...this.form.getValues(),
        type: this.form.getValue('type'),
      },
    }).then(() => {
      if (this.submit.data) {
        const unit = this.submit.data;
        this.unitId = unit.id;
        if (callbackAfterSuccess) {
          callbackAfterSuccess(unit);
        }
        this.form.setInitialValues({
          ...unit,
          module: this.form.getValue('module'),
        });
        NotificationService.addNotification(
          `Unit ${unitId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${unitId ? 'updating' : 'creating'} unit.`,
          'error',
        );
      }
    });
  })
}
