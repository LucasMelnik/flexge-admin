import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

class StudentRecordDetailExecutionResultDialogService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      show: false,
      items: [],
    });
  }

  handleShow = action((unitResultId) => {
    this.fetch.fetch({
      url: `/executions/${unitResultId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, 'answeredAt', 'asc');
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

const studentRecordDetailExecutionResultDialogService = new StudentRecordDetailExecutionResultDialogService();

export default studentRecordDetailExecutionResultDialogService;
