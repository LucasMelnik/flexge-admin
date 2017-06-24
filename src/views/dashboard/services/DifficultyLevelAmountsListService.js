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

  load = action(() => {
    this.fetch.fetch({
      url: `/stats/${localStorage.getItem('id')}/difficulty-level`,
    }).then(() => {
      if (this.fetch.data) {
        const teacherAmounts = toJS(this.fetch.data);
        this.difficultyAmounts = [
          {
            difficultyLevel: 'Easy',
            amount: (teacherAmounts.find(teacherAmount => teacherAmount.id === 'EASY') || {}).amount || 0,
            points: 1,
          },
          {
            difficultyLevel: 'Moderate',
            amount: (teacherAmounts.find(teacherAmount => teacherAmount.id === 'MODERATE') || {}).amount || 0,
            points: 2,
          },
          {
            difficultyLevel: 'Hard',
            amount: (teacherAmounts.find(teacherAmount => teacherAmount.id === 'HARD') || {}).amount || 0,
            points: 3,
          },
        ];

        const totalTime = this.difficultyAmounts.reduce((acc, difficultyAmount) => acc + (difficultyAmount.points * difficultyAmount.amount), 0);
        const totalAmount = this.difficultyAmounts.reduce((acc, difficultyAmount) => acc + difficultyAmount.amount, 0);
        this.average = totalTime / totalAmount;
      } else {
        this.difficultyAmounts = [];
      }
    });
  });
}

const difficultyLevelAmountsListService = new DifficultyLevelAmountsListService();

export default difficultyLevelAmountsListService;
