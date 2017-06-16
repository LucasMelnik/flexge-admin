import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class QuestionTypeListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      types: [],
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/question-types',
      query: {
        page: 0,
        size: 100,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.types = this.fetch.data.docs;
      } else {
        this.schools = [];
        this.total = 0;
      }
    });
  });
}

// const questionTypeListService = new QuestionTypeListService();

// export default schoolListService;
