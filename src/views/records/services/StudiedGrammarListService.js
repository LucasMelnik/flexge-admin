import { action, extendObservable } from 'mobx';
import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

export default class StudiedGrammarListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      grammars: [],
    });
  }

  load = action((schoolId, schoolClassId) => {
    const from = moment().days(moment().days() - 60).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.fetch.fetch({
      url: `/records/schools/${schoolId}/school-classes/${schoolClassId}/grammar-stats?from=${from}&to=${to}`,
    }).then(() => {
      if (this.fetch.data) {
        this.grammars = this.fetch.data.map(grammar => ({
          ...grammar,
          children: orderBy(uniqBy(grammar.children, unitItem => unitItem.item.id), ['unit.module.course.name', 'unit.module.name', 'unit.name'], ['asc', 'asc', 'asc']),
        }));
      } else {
        this.grammars = [];
      }
    });
  });

  loadByStudent = action((studentId) => {
    const from = moment().days(moment().days() - 60).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.fetch.fetch({
      url: `/records/students/${studentId}/grammar-stats?from=${from}&to=${to}`,
    }).then(() => {
      if (this.fetch.data) {
        this.grammars = this.fetch.data.map(grammar => ({
          ...grammar,
          children: orderBy(uniqBy(grammar.children, unitItem => unitItem.item.id), ['unit.module.course.name', 'unit.module.name', 'unit.name'], ['asc', 'asc', 'asc']),
        }));
      } else {
        this.grammars = [];
      }
    });
  });
}
