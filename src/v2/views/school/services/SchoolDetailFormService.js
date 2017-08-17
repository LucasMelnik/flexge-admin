import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../../core/validations';

class SchoolDetailFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      name: [isRequired],
      company: localStorage.role === 'COMPANY_MANAGER' ? [] : [isRequired],
    };
  }

  handleLoad = action((schoolId) => {
    this.form.reset();
    if (schoolId) {
      this.fetch.fetch({
        url: `/schools/${schoolId}`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            company: this.fetch.data.company.id,
          };
          this.form.setInitialValues(data);
        }
      });
    } else {
      this.form.setInitialValues({ country: 'Brazil' });
    }
    this.schoolId = schoolId;
  });

}

const schoolDetailFormService = new SchoolDetailFormService();

export default schoolDetailFormService;
