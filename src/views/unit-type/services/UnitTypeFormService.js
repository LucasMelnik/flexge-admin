import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class UnitTypeFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      typeId: null,
    });
    this.form.validations = {
      name: [isRequired],
      'description.pt': [isRequired],
      'description.en': [isRequired],
      'description.es': [isRequired],
      abilities: [isRequired],
      itemsType: [isRequired],
      academicPlan: [isRequired],
    };
  }

  handleLoad = action((typeId) => {
    this.form.reset();
    if (typeId) {
      this.fetch.fetch({
        url: `/unit-types/${typeId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues({
            ...this.fetch.data,
          });
        }
      });
    } else {
      this.form.setInitialValues({});
    }
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const typeId = this.form.getValue('id');
    this.submit.fetch({
      method: typeId ? 'put' : 'post',
      url: typeId ? `/unit-types/${typeId}` : '/unit-types',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const unitType = this.submit.data;
        this.form.reset();
        this.form.setInitialValues(unitType);

        NotificationService.addNotification(`Unit Type ${typeId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${typeId ? 'updating' : 'creating'} unit type.`, 'error');
      }
    });
  });
}
