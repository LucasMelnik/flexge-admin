import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ItemTypeFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      itemTypeId: null,
    });
    this.form.validations = {
      name: [isRequired],
      key: [isRequired],
    };
  }

  handleLoad = action((itemTypeId) => {
    this.form.reset();
    if (itemTypeId) {
      this.fetch.fetch({
        url: `/item-types/${itemTypeId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.itemTypeId = itemTypeId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      window.showErrorMessage('Fill the required fields');
      return;
    }
    const itemTypeId = this.form.getValue('id');
    this.submit.fetch({
      method: itemTypeId ? 'put' : 'post',
      url: itemTypeId ? `/item-types/${itemTypeId}` : '/item-types',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const itemType = this.submit.data;
        this.itemTypeId = itemType.id;
        this.form.reset();
        this.form.setInitialValues(itemType);

        window.showSuccess(`ItemType ${itemTypeId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${itemTypeId ? 'updating' : 'creating'} itemType.`,
          null,
          null,
          'error',
        );
      }
    });
  });
}

const itemTypeFormService = new ItemTypeFormService();

export default itemTypeFormService;
