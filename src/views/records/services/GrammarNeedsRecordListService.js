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
}
