import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import RankingListFilterService from './RankingListFilterService';

export default class RankingListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      rankings: [],
      from: null,
      to: null,
      level: null,
    });
  }

  init = action((level, from, to) => {
    this.from = from;
    this.to = to;
    this.level = level;
  });

  load = action((useFormMonth) => {
    this.fetch.fetch({
      url: '/reports/ranking',
      query: {
        from: useFormMonth ? moment(RankingListFilterService.form.getValue('month'), 'MM').startOf('month').format('YYYY-MM-DD HH:mm:ss') : this.from,
        to: useFormMonth ? moment(RankingListFilterService.form.getValue('month'), 'MM').endOf('month').format('YYYY-MM-DD HH:mm:ss') : this.to,
        academicPlan: RankingListFilterService.form.getValue('academicPlan'),
        level: this.level,
        ...RankingListFilterService.form.getValue('school') && {
          school: RankingListFilterService.form.getValue('school'),
        },
        ...RankingListFilterService.form.getValue('region') && {
          region: RankingListFilterService.form.getValue('region'),
        },
        ...RankingListFilterService.form.getValue('country') && {
          country: RankingListFilterService.form.getValue('country'),
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.rankings = this.fetch.data;
      } else {
        this.rankings = [];
      }
    });
  });
}
