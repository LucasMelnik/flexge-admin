import { action, extendObservable } from 'mobx';
import moment from 'moment';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';

export default class GrammarNeedsRecordListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      grammars: [],
    });
  }

  loadSchoolClassGrammarNeeds = action((schoolId, schoolClassId) => {
    const from = moment().days(moment().days() - 60).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.fetch.fetch({
      url: `/records/schools/${schoolId}/school-classes/${schoolClassId}/grammar-needs?from=${from}&to=${to}`,
    }).then(() => {
      if (this.fetch.data) {
        this.grammars = this.fetch.data.map(grammar => ({
          ...grammar,
          children: grammar.students.map(student => ({
            ...student,
            id: `${student.id}-${grammar.id}`,
            errorPercentage: round(student.errorPercentage, 2),
          })),
        }));
      } else {
        this.grammars = [];
      }
    });
  });

  loadStudentGrammarNeeds = action((idStudent) => {
    const from = moment().days(moment().days() - 60).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.fetch.fetch({
      url: `/records/students/${idStudent}/grammar-needs?from=${from}&to=${to}`,
    }).then(() => {
      if (this.fetch.data) {
        this.grammars = this.fetch.data.map(grammar => ({
          ...grammar.students[0],
          ...grammar,
        }));
      } else {
        this.grammars = [];
      }
    });
  });
}
