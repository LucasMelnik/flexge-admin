import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';

class RankingListService {
  fetchRegional = new FetchService();
  fetchNational = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      regionalRanking: [],
      nationalRanking: [],
      from: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      to: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    });
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
  });

  handleFilterChange = action((schoolId) => {
    this.schoolId = schoolId;
    this.loadRegionalRanking();
    this.loadNationalRanking();
  });

  loadRegionalRanking = action(() => {
    this.fetchRegional.fetch({
      url: `/reports/schools/${this.schoolId}/ranking?from=${this.from}&to=${this.to}&level=regional`,
    }).then(() => {
      if (this.fetchRegional.data) {
        this.regionalRanking = this.fetchRegional.data;
      } else {
        this.regionalRanking = [];
      }
    });
  });

  loadNationalRanking = action(() => {
    this.fetchNational.fetch({
      url: `/reports/schools/${this.schoolId}/ranking?from=${this.from}&to=${this.to}&level=national`,
    }).then(() => {
      if (this.fetchNational.data) {
        this.nationalRanking = this.fetchNational.data;
      } else {
        this.nationalRanking = [];
      }
    });
  });
}

const rankingListService = new RankingListService();

export default rankingListService;
