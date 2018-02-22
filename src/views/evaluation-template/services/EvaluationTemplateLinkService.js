import { action, extendObservable, observe } from 'mobx';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import EvaluationTemplateListService from './EvaluationTemplateListService';
import NotificationService from '../../../core/services/NotificationService';

class EvaluationTemplateLinkService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolClasses: [],
    });

    observe(EvaluationTemplateListService, 'templates', () => {
      if (EvaluationTemplateListService.templates.length) {
        this.schoolClasses = [];
        const schools = uniqBy(EvaluationTemplateListService.templates.map(template => template.school), 'id');
        schools.map(school => this.load(school.id));
      }
    });
  }

  load = action((schoolId) => {
    this.fetch.fetch({
      url: `/schools/${schoolId}/classes`,
    }).then(() => {
      if (this.fetch.data) {
        this.schoolClasses = orderBy([
          ...this.fetch.data,
          ...this.schoolClasses,
        ], ['school.name', 'name']);
      }
    });
  });

  handleChange = action((path, value, schoolClass) => {
    this.submit.fetch({
      method: 'put',
      url: `/schools/${schoolClass.school.id}/classes/${schoolClass.id}`,
      body: {
        name: schoolClass.name,
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
          NotificationService.addNotification('Error to set class room configs', 'error');
        }
      }
    });
  });
}

const evaluationTemplateLinkService = new EvaluationTemplateLinkService();

export default evaluationTemplateLinkService;
