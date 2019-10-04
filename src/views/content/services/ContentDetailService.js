import { extendObservable, action } from 'mobx';
import head from 'lodash/head';
import FetchService from '../../../core/services/FetchService';

export default class ContentDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      unit: {
        module: {
          course: {},
        },
      },
    });
  }

  handleLoad = action((unitId) => {
    this.fetch.fetch({
      url: `/approved-units`,
      query: {
        _id: unitId
      }
    }).then(() => {
      const unit = head(this.fetch.data);
      this.fetch.fetch({
        url: `/modules/${unit.module}/units/${unit.id}`,
      }).then(() => {
        this.unit = this.fetch.data;
      });
    });
  });

}
