import { extendObservable, action } from 'mobx';
// import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
// import FormService from '../../../core/services/FormService';
// import NotificationService from '../../../core/services/NotificationService';
// import { isRequired, minLength } from '../../../core/validations';

class UnitItemFormService {
  // fetch = new FetchService();
  submit = new FetchService();
  // form = new FormService();

  constructor() {
    extendObservable(this, {
      successCallback: null,
    });
  }

  init = action((successCallback) => {
    this.successCallback = successCallback;
  });

  handleSave = action((unitItem) => {
    const unitItemId = unitItem.id;
    this.submit.fetch({
      method: unitItemId ? 'put' : 'post',
      url: unitItemId ? `/units/${unitItem.unit}/items/${unitItemId}` : `/units/${unitItem.unit}/items`,
      body: unitItem,
    }).then(() => {
      if (this.submit.data) {
        const item = this.submit.data;
        if (this.successCallback) {
          this.successCallback(item);
        }
      }
      if (this.submit.error) {
        console.log('error on link unit to item', this.submit.error);
      }
    });
  })
}

const unitItemFormService = new UnitItemFormService();

export default unitItemFormService;
