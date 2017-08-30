import { action, extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class PlacementTestFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      placementTestId: null,
    });
    this.form.validations = {
      placementTestLevel: [isRequired],
      order: [isRequired],
      grammar: [isRequired],
    };
  }

  handleLoad = action((placementTestId) => {
    this.form.reset();
    if (placementTestId) {
      this.fetch.fetch({
        url: `/grammar-placement-test-levels/${placementTestId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.placementTestId = placementTestId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const placementTestId = this.form.getValue('id');
    this.submit.fetch({
      method: placementTestId ? 'put' : 'post',
      url: placementTestId ? `/grammar-placement-test-levels/${placementTestId}` : '/grammar-placement-test-levels',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const placementTest = this.submit.data;
        browserHistory.push(`/placement-test/${placementTest.id}`);
        this.placementTestId = placementTest.id;
        this.form.reset();
        this.form.setInitialValues(placementTest);
        NotificationService.addNotification(
          `Placement Test Grammar ${placementTestId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${placementTestId ? 'updating' : 'creating'} Placement Test Grammar.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const placementTestFormService = new PlacementTestFormService();

export default placementTestFormService;
