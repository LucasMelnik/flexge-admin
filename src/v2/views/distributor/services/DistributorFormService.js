import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../../core/validations';

class DistributorFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      distributorId: null,
    });
    this.form.validations = {
      name: [isRequired],
    };
  }

  handleLoad = action((distributorId) => {
    this.form.reset();
    console.log(distributorId, ' id')
    if (distributorId) {
      this.fetch.fetch({
        url: `/distributors/${distributorId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.distributorId = distributorId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      window.showErrorMessage('Fill the required fields');
      return;
    }
    const distributorId = this.form.getValue('id');
    this.submit.fetch({
      method: distributorId ? 'put' : 'post',
      url: distributorId ? `/distributors/${distributorId}` : '/distributors',
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        const distributor = this.submit.data;
        browserHistory.push(`/v2/distributors/${distributor.id}`);
        this.distributorId = distributor.id;
        this.form.reset();
        this.form.setInitialValues(distributor);
        window.showSuccess(`Distributor ${distributorId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${distributorId ? 'updating' : 'creating'} distributor.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const distributorFormService = new DistributorFormService();

export default distributorFormService;
