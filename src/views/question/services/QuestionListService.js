import { action, extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class QuestionListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      questions: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      filter: '',
      unit: null,
      selectCallback : null,
    });
  }

  init = action((unitId, selectCallback) => {
    this.page = 1;
    this.filter = '';
    this.unit = unitId;
    this.selectCallback = selectCallback;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/questions',
      query: {
        page: this.page,
        size: this.rowsByPage,
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options : 'i',
          },
          unit: this.unit,
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.questions = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.page = this.fetch.data.page;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.questions = [];
        this.total = 0;
        this.page = 1;
        this.pageCount = 1;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    console.log(value)
    this.load();
  });

  handleSelect = action((question)=> {
    if (this.selectCallback) {
      this.selectCallback(question);
    } else {
      browserHistory.push(`/distributors/${question.id}`);
    }
  });

  handleRemove = action((question) => {
    ConfirmationDialogService.show(
      'Delete Question',
      `You are about to delete the question "${question.text}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/questions/${question.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const questionListService = new QuestionListService();

export default questionListService;
