import { action, extendObservable } from 'mobx';

class SchoolGradeConfigFilterService {

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
  }

  handleFilterChange = action((schoolId) => {
    this.schoolId = schoolId;
  });
}

const schoolGradeConfigFilterService = new SchoolGradeConfigFilterService();

export default schoolGradeConfigFilterService;