import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class EvaluationTemplateListService {
  fetch = new FetchService();
  filterForm = new FormService();

  constructor() {
    extendObservable(this, {
      templates: [],
    });
    this.filterForm.setInitialValues({});
  }

  init = action(() => {
    this.templates = [];
    if (localStorage.role === 'SCHOOL_MANAGER') {
      const school = JSON.parse(localStorage.getItem('school'));
      this.filterForm.setValue('school', school._id);
    }
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/evaluation-templates',
      query: {
        query: {
          ...this.filterForm.getValue('school') && {
            school: this.filterForm.getValue('school'),
          },
          ...this.filterForm.getValue('year') && {
            year: this.filterForm.getValue('year'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.templates = this.fetch.data;
      } else {
        this.templates = [];
      }
    });
  });

  handleRemove = action((evaluationTemplate) => {
    ConfirmationDialogService.show(
      'Delete Evaluation Template',
      `You are about to delete the template "${evaluationTemplate.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/evaluation-templates/${evaluationTemplate.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification('Evaluation Template deleted successfully.', 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      },
    );
  });
}

const evaluationTemplateListService = new EvaluationTemplateListService();

export default evaluationTemplateListService;
