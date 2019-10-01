import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';

class EvaluationTemplateLinkService {
  fetch = new FetchService();
  submit = new FetchService();
  filterForm = new FormService();

  constructor() {
    extendObservable(this, {
      schoolClasses: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
    this.filterForm.validations = {
      school: [isRequired]
    }
  }

  init = action(() => {
    this.schoolClasses = [];
    this.filterForm.setInitialValues({});
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      this.filterForm.setValue('school', localStorage.getItem('school'));
    }
  });

  load = action((pagination) => {
    if(this.filterForm.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
    }

    if (pagination) {
      this.pagination.current = pagination.current;
    } else {
      this.pagination.current = 1;
    }

    this.fetch.fetch({
      url: `/schools/${this.filterForm.getValue('school')}/classes`,
      query: {
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }
    }).then(() => {
      if (this.fetch.data) {
        this.schoolClasses = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      }
    });
  });

  handleChange = action((path, value, schoolClass) => {
    this.submit.fetch({
      method: 'put',
      url: `/schools/${schoolClass.school.id}/classes/${schoolClass.id}`,
      body: {
        name: schoolClass.name,
        academicPlan: schoolClass.academicPlan,
        weeklyHoursRequired: schoolClass.weeklyHoursRequired,
        [path]: value,
      },
    }).then(() => {
      if (this.submit.data) {
        this.schoolClasses = this.schoolClasses.map((sc) => {
          if (schoolClass.id === sc.id) {
            return {
              ...sc,
              [path]: value,
            };
          }
          return sc;
        });
      }
      if (this.submit.error) {
        if (this.submit.response.data.find(d => d.path === 'weeklyHoursRequired')) {
          NotificationService.addNotification('Select the Weekly hours before set the template', 'error');
        } else {
          NotificationService.addNotification('Error to set classroom configs', 'error');
        }
      }
    });
  });
}

const evaluationTemplateLinkService = new EvaluationTemplateLinkService();

export default evaluationTemplateLinkService;
