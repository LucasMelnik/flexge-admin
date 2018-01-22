import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

export default class CertificationTestExecutionAbilityItemListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  load = action((ability, certificationTestId) => {
    this.fetch.fetch({
      method: 'get',
      url: `/certification-test/${certificationTestId}/${ability}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, 'order', 'asc');
      }
      if (this.fetch.error) {
        this.items = [];
      }
    });
  });
}
