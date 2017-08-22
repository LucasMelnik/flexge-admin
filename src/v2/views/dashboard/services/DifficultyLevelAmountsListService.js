import { action, extendObservable, toJS } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class DifficultyLevelAmountsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      difficultyAmounts: [],
      average: 0,
    });
  }

  load = action((course) => {
    if (!course) return;

    this.fetch.fetch({
      url: `/stats/${course}/difficulty-level`,
    }).then(() => {
      if (this.fetch.data) {
        const courseAmounts = toJS(this.fetch.data);
        this.difficultyAmounts = [
          {
            difficultyLevel: 'Easy',
            amount: (courseAmounts.find(courseAmount => courseAmount.id === 'EASY') || {}).amount || 0,
            points: 1,
          },
          {
            difficultyLevel: 'Moderate',
            amount: (courseAmounts.find(courseAmount => courseAmount.id === 'MODERATE') || {}).amount || 0,
            points: 2,
          },
          {
            difficultyLevel: 'Hard',
            amount: (courseAmounts.find(courseAmount => courseAmount.id === 'HARD') || {}).amount || 0,
            points: 3,
          },
        ];

        const totalTime = this.difficultyAmounts.reduce((acc, difficultyAmount) => acc + (difficultyAmount.points * difficultyAmount.amount), 0);
        const totalAmount = this.difficultyAmounts.reduce((acc, difficultyAmount) => acc + difficultyAmount.amount, 0);
        this.average = (totalTime / totalAmount) || 0;
      } else {
        this.difficultyAmounts = [];
      }
    });
  });
}

const difficultyLevelAmountsListService = new DifficultyLevelAmountsListService();

export default difficultyLevelAmountsListService;
