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
      query: {
        page: 1,
        size: 1000
      }
    }).then(() => {
      if (this.schoolsFetch.data) {
        this.allSchools = this.schoolsFetch.data.docs;
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
        const formattedData = this.fetch.data.map(school => {
          if (type === 'month') {
            let currentCharge;
            let lastMonthCharge;
            if (school.activeStudentsLastMonth) {
              currentCharge = school.activeStudents - school.placementCount;
              lastMonthCharge = school.activeStudentsLastMonth - school.placementCountLastMonth;
            }

            return {
              ...school,
              chargeVariation: lastMonthCharge && currentCharge ? ((currentCharge - lastMonthCharge) / lastMonthCharge) * 100 : undefined,
              children: school.children.map((plan) => {
                let currentPlanCharge;
                let lastMonthPlanCharge;
                if (plan.activeStudentsLastMonth) {
                  currentPlanCharge = plan.activeStudents - plan.placementCount;
                  lastMonthPlanCharge = plan.activeStudentsLastMonth - plan.placementCountLastMonth;
                }

                return {
                  ...plan,
                  chargeVariation: lastMonthPlanCharge && currentPlanCharge ? ((currentPlanCharge - lastMonthPlanCharge) / lastMonthPlanCharge) * 100 : undefined,
                };
              })
            };
          }
          return school;
        });
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
