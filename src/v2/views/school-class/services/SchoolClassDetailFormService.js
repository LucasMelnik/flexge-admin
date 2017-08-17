import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';

class SchoolClassDetailFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      schoolId: null,
      successCallback: null,
    });
    this.form.validations = {
      name: [isRequired],
    };
  }

  handleLoad = action((schoolId, classId) => {
    this.fetch.fetch({
      url: `/schools/${schoolId}/classes/${classId}`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.reset();
        this.form.setInitialValues({
          ...this.fetch.data,
          teacher: this.fetch.data.teacher.id,
        });
      }
    });
  });

}

const schoolClassDetailFormService = new SchoolClassDetailFormService();

export default schoolClassDetailFormService;
