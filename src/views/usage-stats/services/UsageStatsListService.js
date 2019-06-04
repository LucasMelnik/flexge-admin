import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';

class UsageStatsListService {
  fetch = new FetchService();
  schoolsFetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schools: [],
      allSchools: [],
    });
    this.form.validations = {
      month: [isRequired],
    };
  }

  init = action(() => {
    this.schools = [];
    this.schoolsFetch.fetch({
      url: '/schools',
    }).then(() => {
      if (this.schoolsFetch.data) {
        this.allSchools = this.schoolsFetch.data;
      } else {
        this.allSchools = [];
      }
    })
  });

  load = action((month, company, distributor) => {

    this.fetch.fetch({
      url: `/reports/${month.format('MM-YYYY')}/usage-stats`,
      query: {
        ...company && {
          company,
        },
        ...distributor && {
          distributor,
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        const formattedData = this.fetch.data.map(school => ({
          ...school,
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
        this.schools = [
          ...formattedData,
          ...this.allSchools.filter(s => !formattedData.some(x => x.id === s.id) && (!company || s.company.id === company) && (!distributor || s.company.distributor === distributor))
        ];
      } else {
        this.schools = [];
      }
    });
  });
}

const usageStatsListService = new UsageStatsListService();

export default usageStatsListService;
