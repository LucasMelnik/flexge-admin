import { action, extendObservable } from 'mobx';
import moment from 'moment';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';

export default class GrammarNeedsRecordListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      schoolClassId: null,
      studentId: null,
      grammars: [],
    });
  }

  init = action((schoolId, schoolClassId) => {
    this.schoolId = schoolId;
    this.schoolClassId = schoolClassId;
  });

  loadSchoolClassGrammarNeeds = action(() => {
    const from = moment().days(moment().days() - 30).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.fetch.fetch({
      url: `/records/schools/${this.schoolId}/school-classes/${this.schoolClassId}/grammar-needs?from=${from}&to=${to}`,
    }).then(() => {
      if (this.fetch.data) {
        this.grammars = this.fetch.data.map(grammar => ({
          ...grammar,
          correctPercentage: round((grammar.correctCount / grammar.total) * 100, 2),
          errorPercentage: round((grammar.errorCount / grammar.total) * 100, 2),
          children: grammar.studentsWithError && grammar.studentsWithError
            .filter(student => !!student)
            .map(student => ({ name: student, id: `${student}-${grammar.id}` })),
        }));
      } else {
        this.grammars = [];
      }
    });
  });
}
