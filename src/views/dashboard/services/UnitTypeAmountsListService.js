import { action, extendObservable, toJS } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class UnitTypeAmountsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      unitTypesAmounts: [],
    });
  }

  load = action((course) => {

    if (!course) return;

    this.fetch.fetch({
      url: '/unit-types',
    }).then(() => {
      if (this.fetch.data) {
        this.unitTypesAmounts = toJS(this.fetch.data).map(unitType => ({
          id: unitType.id,
          name: unitType.name,
          amountDone: 0,
        }));

        this.fetch = new FetchService();
        this.fetch.fetch({
          url: `/stats/${course}/unit-types`,
        }).then(() => {
          const amounts = toJS(this.fetch.data) || [];
          this.unitTypesAmounts = this.unitTypesAmounts.map(unitTypeAmount => {
            const typeAmount = amounts.find(amount => amount.id === unitTypeAmount.id) || {};
            return {
              ...unitTypeAmount,
              amountDone: typeAmount.amount || 0,
            }
          });
          this.unitTypesAmounts.push({
            name: 'Total',
            amountDone: this.unitTypesAmounts.reduce((acc, typeAmount) => acc + typeAmount.amountDone, 0),
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
