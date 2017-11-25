import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class SchoolGradeConfigFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      weeklyHoursRequired: [isRequired],
      maximumGrade: [isRequired],
      gradeFormat: [isRequired],
      percentHoursRelevanceInGrade: [isRequired],
      percentStudyQualityRelevanceInGrade: [isRequired],
    };
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    this.form.reset();
    this.fetch.fetch({
      url: `/schools/${this.schoolId}`,
    }).then(() => {
      if (this.fetch.data) {
        const data = {
          ...this.fetch.data,
          company: this.fetch.data.company.id,
        };
        this.form.setInitialValues(data);
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const hoursPercentage = parseInt(this.form.getValue('percentHoursRelevanceInGrade'), 10);
    const sqPercentage = parseInt(this.form.getValue('percentStudyQualityRelevanceInGrade'), 10);
    if ((hoursPercentage + sqPercentage) !== 100) {
      NotificationService.addNotification('The sum of Hours and Study Quality percentages must be equal to 100', 'error');
      return;
    }
    const schoolId = this.form.getValue('id');
    this.submit.fetch({
      method: 'put',
      url: `/schools/${schoolId}`,
      body: {
        ...this.form.getValues(),
        company: this.form.getValue('company'),
      },
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        this.schoolId = school.id;
        this.form.setInitialValues({
          ...school,
          company: this.form.getValue('company'),
        });
        NotificationService.addNotification(`School ${schoolId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${schoolId ? 'updating' : 'creating'} school.`, 'error');
      }
    });
  })
}
