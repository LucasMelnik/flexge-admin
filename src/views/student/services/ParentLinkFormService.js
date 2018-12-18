import { action, extendObservable } from 'mobx';
import { orderBy, throttle } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import ParentListService from './ParentListService';
import { isRequired } from '../../../core/validations';

export default class ParentLinkFormService {
  fetch = new FetchService();
  fetchParents = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      schoolId: null,
      parents: [],
    });
    this.form.validations = {
      parent: [isRequired],
    };
  }

  handleInit = action((studentId) => {
    this.studentId = studentId;
    this.form.setInitialValues({});
    this.form.reset();

    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = JSON.parse(localStorage.getItem('school'));
      this.schoolId = school._id;
    }
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Please, select a Parent to link to Student', 'error');
      return;
    }
    const parentId = this.form.getValue('parent');
    this.submit.fetch({
      method: 'put',
      url: `/students/${this.studentId}/parents/${parentId}/link`,
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({});
        this.form.reset();
        ParentListService.load();
        NotificationService.addNotification(
          'Parent added successfully.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          this.submit.error || 'Error linking the parent.',
          'error',
        );
      }
    });
  });

  loadParents = throttle(action(() => {
    if (this.form.getValue('parentFilter').trim().length < 3) {
      return;
    }

    this.fetchParents.fetch({
      url: '/users',
      query: {
        query: {
          school: (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') ? this.schoolId : undefined,
          role: 'PARENT',
          $or: [
            {
              email: {
                $regex: this.form.getValue('parentFilter'),
                $options: 'i',
              },
            },
            {
              name: {
                $regex: this.form.getValue('parentFilter'),
                $options: 'i',
              },
            },
          ],
        },
      },
    }).then(() => {
      if (this.fetchParents.data) {
        this.parents = orderBy(this.fetchParents.data, ['name', 'email'], ['asc', 'asc']);
      } else {
        this.parents = [];
      }
    });
  }), 1000);
}
