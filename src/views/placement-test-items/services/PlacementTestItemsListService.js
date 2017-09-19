import numeral from 'numeral';
import maxBy from 'lodash/maxBy';
import get from 'lodash/get';
import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

class PlacementTestItemsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/placement-test-stats',
    }).then(() => {
      if (this.fetch.data) {
        const items = orderBy(this.fetch.data, ['placementTestLevel.level', 'order'], ['asc',  'asc']);
        this.items = items.map(item => ({
          ...item,
          answerCount: item.answers.length,
          errorPercentage: !item.answers.length ? 'N/A' : numeral(item.answers.filter(answer => !answer.correct).length / item.answers.length).format('0.00%'),
          mostCommonWrongAnswer:get(maxBy(item.answers.filter(answer => !answer.correct), 'answer'), 'answer', 'N/A'),
        }));
      } else {
        this.items = [];
      }
    });
  });
}

const placementTestItemsListService = new PlacementTestItemsListService();

export default placementTestItemsListService;
