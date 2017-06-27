import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class UnitFormService {
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
    };
  }

  handleLoad = action((unitId, moduleId) => {
    this.form.reset();
    if (unitId) {
      this.fetch.fetch({
        url: `/modules/${moduleId}/units/${unitId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.unitId = unitId;
  });

  handleSubmit = action((callbackAfterSuccess) => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const unitId = this.form.getValue('id');
    const moduleId = this.form.getValue('module.id');
    this.submit.fetch({
      method: unitId ? 'put' : 'post',
      url: unitId ? `/modules/${moduleId}/units/${unitId}` : `/modules/${moduleId}/units`,
      body: {
        ...this.form.getValues(),
        type: this.form.getValue('type').id,
      },
    }).then(() => {
      if (this.submit.data) {
        const unit = this.submit.data;
        this.unitId = unit.id;
        if (callbackAfterSuccess) {
          callbackAfterSuccess(this.unitId);
        }
        this.form.setInitialValues({
          ...unit,
          module: this.form.getValue('module'),
        });
        NotificationService.addNotification(
          `Unit ${unitId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${unitId ? 'updating' : 'creating'} unit.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const unitFormService = new UnitFormService();

export default unitFormService;
