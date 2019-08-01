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

  load = action((type, params) => {

    this.fetch.fetch({
      url: `/reports/${type}/usage-stats`,
      query: {
        ...params,
        ...params.month && {
          month: params.month.format('MM-YYYY')
        },
        ...params.from && {
          from: params.from.format('YYYY-MM-DD')
        },
        ...params.to && {
          to: params.to.format('YYYY-MM-DD')
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        const formattedData = this.fetch.data.map(school => ({
          ...school,
          children: school.children.map((plan) => {
            if (type === 'month' && plan.activeStudentsLastMonth) {
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
          ...this.allSchools.filter(s => !formattedData.some(x => x.id === s.id) && (!params.company || s.company.id === params.company) && (!params.distributor || s.company.distributor === params.distributor))
        ];
      } else {
        this.schools = [];
      }
    });
  });
}

const usageStatsListService = new UsageStatsListService();

export default usageStatsListService;
