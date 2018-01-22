import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class CertificationTestRegisterItemListService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      certificationTestId: null,
    });
  }

  init = action((certificationTestId) => {
    this.items = [];
    this.certificationTestId = certificationTestId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/certification-test-course-ability/${this.certificationTestId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, ['order'], ['asc']);
      } else {
        this.items = [];
        this.total = 0;
      }
    });
  });

  handleOrderChange = action((certificationTestItem, order) => {
    this.submit.fetch({
      url: `/certification-test-course-ability/${this.certificationTestId}/items/${certificationTestItem.item.id}`,
      method: 'put',
      body: {
        order,
      },
    }).then(() => {
      this.load();
    });
  });

  handleUnlinkItem = action((certificationTestItem) => {
    ConfirmationDialogService.show(
      'Delete Item',
      `You are about to delete the item "${certificationTestItem.item.text}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/certification-test-course-ability/${this.certificationTestId}/items/${certificationTestItem.item.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification('Item deleted', 'success');
          this.load();
        });
      });
  });
}

const certificationTestRegisterItemListService = new CertificationTestRegisterItemListService();

export default certificationTestRegisterItemListService;
