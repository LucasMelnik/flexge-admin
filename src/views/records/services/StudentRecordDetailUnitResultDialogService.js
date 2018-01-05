import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class StudentRecordDetailUnitResultDialogService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      show: false,
      items: [],
    });
  }

  handleShow = action((unitResultId) => {
    this.fetch.fetch({
      url: `/results/${unitResultId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
      this.show = true;
    });
  });

  handleClose = action(() => {
    this.show = false;
    this.items = [];
  });
}

const studentRecordDetailUnitResultDialogService = new StudentRecordDetailUnitResultDialogService();

export default studentRecordDetailUnitResultDialogService;
