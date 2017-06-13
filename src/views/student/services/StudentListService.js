import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class StudentListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      students: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      filter: '',
    });
  }

  init = action(() => {
    this.page = 1;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/students',
      query: {
        page: this.page,
        size: this.rowsByPage,
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options : 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.students = [];
        this.total = 0;
      }
    });
  });

  handlePageChange = action((page) => {
    this.page = page.selected + 1;
    this.load();
  });

  handleRemove = action((studentId) => {
    this.fetch.fetch({
      url: `/students/${studentId}`,
      method: 'delete',
    }).then(() => {
      this.load();
    });
  });
}

const studentListService = new StudentListService();

export default studentListService;
