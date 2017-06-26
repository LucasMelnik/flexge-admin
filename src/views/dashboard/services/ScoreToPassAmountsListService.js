import { action, extendObservable, toJS } from 'mobx';
import range from 'lodash/range';
import FetchService from '../../../core/services/FetchService';

class ScoreToPassAmountsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      scoreToPassAmounts: [],
      average: 0,
    });
  }

  load = action((course) => {
    if (!course) return;

    this.fetch.fetch({
      url: `/stats/${course}/score-to-pass`,
    }).then(() => {
      if (this.fetch.data) {
        const courseAmounts = toJS(this.fetch.data);
        this.scoreToPassAmounts = range(70, 105, 5).map(scoreToPass => {
          return {
            scoreToPass,
            amount: (courseAmounts.find(courseAmount => courseAmount.id === scoreToPass) || {}).amount || 0
          }
        });

        const totalTime = this.scoreToPassAmounts.reduce((acc, scoreAmount) => acc + (scoreAmount.scoreToPass * scoreAmount.amount), 0);
        const totalAmount = this.scoreToPassAmounts.reduce((acc, scoreAmount) => acc + scoreAmount.amount, 0);
        this.average = (totalTime / totalAmount) || 0;
      } else {
        this.scoreToPassAmounts = [];
      }
    });
  });
}

const scoreToPassAmountsListService = new ScoreToPassAmountsListService();

export default scoreToPassAmountsListService;
