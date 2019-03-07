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
        this.schools = this.fetch.data.map(school => ({
          ...school,
          activeStudents: school.children.reduce((acc, x) => acc + x.activeStudents, 0),
          placementCount: school.children.reduce((acc, x) => acc + x.placementCount, 0),
          studiedHours: school.children.reduce((acc, x) => acc + x.studiedHours, 0),
          children: school.children.map((plan) => {
            if (plan.activeStudentsLastMonth) {
              const currentCharge = plan.activeStudents - plan.placementCount;
              const lastMonthCharge = plan.activeStudentsLastMonth - plan.placementCountLastMonth;

              return {
                ...plan,
                chargeVariation: lastMonthCharge && currentCharge ? ((currentCharge - lastMonthCharge) / lastMonthCharge) * 100 : undefined,
              };
            }
            return plan;
          }),
        }));
      } else {
        this.schools = [];
      }
    });
  });
}

const usageStatsListService = new UsageStatsListService();

export default usageStatsListService;
