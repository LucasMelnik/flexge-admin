import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';
import DistributorManagerListService from './DistributorManagerListService';

class DistributorManagerFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      managerId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      distributor: [isRequired],
    };
  }

  setInitialValues = action((distributorId) => {
    this.form.reset();
    this.form.setInitialValues({ distributor: distributorId });
    this.distributorId = distributorId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const managerId = this.form.getValue('id');
    this.submit.fetch({
      method: managerId ? 'put' : 'post',
      url: managerId ? `/distributors/${this.distributorId}/managers/${managerId}` : `/distributors/${this.distributorId}/managers`,
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        DistributorManagerListService.load(this.distributorId);
        this.form.reset();
        this.form.setInitialValues({ distributor: this.distributorId });
        NotificationService.addNotification(
          `Manager ${managerId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${managerId ? 'updating' : 'creating'} manager.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const distributorFormService = new DistributorManagerFormService();

export default distributorFormService;
