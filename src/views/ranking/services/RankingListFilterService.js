import { action, extendObservable } from 'mobx';

class RankingListFilterService {

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = JSON.parse(localStorage.getItem('school'));
      this.schoolId = school._id;
    }
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
  });

  handleFilterChange = action((schoolId) => {
    this.schoolId = schoolId;
  });
}

const rankingListFilterService = new RankingListFilterService();

export default rankingListFilterService;
