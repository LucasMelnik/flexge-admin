import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';

class UsageStatsListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schools: [],
    });
    this.form.validations = {
      month: [isRequired],
    };
  }

  init = action(() => {
    this.schools = [];
  });

  load = action((month, company) => {

    this.fetch.fetch({
      url: `/reports/${month.format('MM-YYYY')}/usage-stats`,
      query: {
        ...company && {
          company,
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.schools = this.fetch.data.map((school) => {
          if (school.activeStudentsLastMonth) {
            const currentCharge = school.activeStudents - school.placementCount;
            const lastMonthCharge = school.activeStudentsLastMonth - school.placementCountLastMonth;

            return {
              ...school,
              chargeVariation: lastMonthCharge && currentCharge ? ((currentCharge - lastMonthCharge) / lastMonthCharge) * 100 : undefined,
            };
          }
          return school;
        });
      } else {
        this.schools = [];
      }
    });
  });
}

const usageStatsListService = new UsageStatsListService();

export default usageStatsListService;
