import { extendObservable, action } from 'mobx';
import head from 'lodash/head';
import FetchService from '../../../core/services/FetchService';

export default class ContentDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      unit: {},
    });
  }

  handleLoad = action((unitId) => {
    this.fetch.fetch({
      url: `/approved-units?_id=${unitId}`,
    }).then(() => {
      this.unit = head(this.fetch.data);
    });
  });

}
