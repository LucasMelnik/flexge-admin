import { action, extendObservable } from 'mobx';

class EmailConfigFilterService {

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
  }

  handleFilterChange = action((schoolId) => {
    this.schoolId = schoolId;
  });
}

const emailConfigFilterService = new EmailConfigFilterService();

export default emailConfigFilterService;