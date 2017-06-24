import { action, extendObservable, toJS } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import PlannedAmount from './planned-amount.json';

class UnitTypeAmountsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      unitTypesAmounts: [],
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/unit-types?size=30',
    }).then(() => {
      if (this.fetch.data) {
        const teacherPlannedAmount = PlannedAmount.find(planned => planned.teacher === localStorage.getItem('email'));
        this.unitTypesAmounts = toJS(this.fetch.data.docs).map(unitType => {
          return {
            id: unitType.id,
            name: unitType.name,
            plannedAmount: teacherPlannedAmount[unitType.name],
            amountDone: 0,
            amountToDo: 0,
          }
        });
        this.fetch = new FetchService();
        this.fetch.fetch({
          url: `/stats/${localStorage.getItem('id')}/unit-types`,
        }).then(() => {
          const amounts = toJS(this.fetch.data);
          this.unitTypesAmounts = this.unitTypesAmounts.map(unitTypeAmount => {
            const typeAmount = amounts.find(amount => amount.id === unitTypeAmount.id) || {};
            return {
              ...unitTypeAmount,
              amountDone: typeAmount.amount || 0,
              amountToDo: (unitTypeAmount.plannedAmount - (typeAmount.amount || 0)),
            }
          });
          this.unitTypesAmounts.push({
            name: 'Total',
            plannedAmount: this.unitTypesAmounts.reduce((acc, typeAmount) => acc + typeAmount.plannedAmount, 0),
            amountDone: this.unitTypesAmounts.reduce((acc, typeAmount) => acc + typeAmount.amountDone, 0),
            amountToDo: this.unitTypesAmounts.reduce((acc, typeAmount) => acc + typeAmount.amountToDo, 0),
          });
        })
      } else {
        this.unitTypesAmounts = [];
      }
    });
  });
}

const unitTypeAmountsListService = new UnitTypeAmountsListService();

export default unitTypeAmountsListService;
