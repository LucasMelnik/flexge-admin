import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SchoolRecordListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      units: [],
      totalApprovedImagesCount: 0,
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/units-image',
    }).then(() => {
      if (this.fetch.data) {
        this.units = this.fetch.data.unitsWithCountImages;
        this.totalApprovedImagesCount = this.fetch.data.totalImagesCount;
      } else {
        this.units = [];
        this.totalApprovedImagesCount = 0;
      }
    });
  });

}

const schoolRecordListService = new SchoolRecordListService();

export default schoolRecordListService;
