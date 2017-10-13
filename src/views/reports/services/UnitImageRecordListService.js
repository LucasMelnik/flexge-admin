import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class SchoolRecordListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      units: [],
      totalImagesPresentationCount: 0,
      totalImagesSingleChoiceCount: 0,
      totalApprovedImagesCount: 0,
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/reports/units-image',
      query: {
        ...this.form.getValue('imageOwner') && {
          imageOwner: this.form.getValue('imageOwner'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.units = this.fetch.data.unitsWithCountImages;
        this.totalImagesPresentationCount = this.fetch.data.totalImagesPresentationCount;
        this.totalImagesSingleChoiceCount = this.fetch.data.totalImagesSingleChoiceCount;
        this.totalApprovedImagesCount = this.fetch.data.totalImagesCount;
      } else {
        this.units = [];
        this.totalApprovedImagesCount = 0;
        this.totalImagesPresentationCount = 0;
        this.totalImagesSingleChoiceCount = 0;
      }
    });
  });

}

const schoolRecordListService = new SchoolRecordListService();

export default schoolRecordListService;
