import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class PlacementTestLevelFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      placementTestLevelId: null,
    });
    this.form.validations = {
      level: [isRequired],
    };
  }

  handleLoad = action((placementTestLevelId) => {
    this.form.reset();
    if (placementTestLevelId) {
      this.fetch.fetch({
        url: `/placement-test-levels/${placementTestLevelId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.placementTestLevelId = placementTestLevelId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const placementTestLevelId = this.form.getValue('id');
    this.submit.fetch({
      method: placementTestLevelId ? 'put' : 'post',
      url: placementTestLevelId ? `/placement-test-levels/${placementTestLevelId}` : '/placement-test-levels',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const placementTestLevel = this.submit.data;
        this.placementTestLevelId = placementTestLevel.id;
        this.form.reset();
        this.form.setInitialValues(placementTestLevel);

        NotificationService.addNotification(`Placement Test Level ${placementTestLevelId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${placementTestLevelId ? 'updating' : 'creating'} placement test level.`, 'error');
      }
    });
  });
}

const placementTestLevelFormService = new PlacementTestLevelFormService();

export default placementTestLevelFormService;
