import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class RegionFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      regionId: null,
    });
    this.form.validations = {
      name: [isRequired],
      country: [isRequired],
    };
  }

  handleLoad = action((regionId) => {
    this.form.reset();
    if (regionId) {
      this.fetch.fetch({
        url: `/regions/${regionId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.regionId = regionId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      window.showErrorMessage('Fill the required fields');
      return;
    }
    const regionId = this.form.getValue('id');
    console.log(regionId, "REGIONID")
    this.submit.fetch({
      method: regionId ? 'put' : 'post',
      url: regionId ? `/regions/${regionId}` : '/regions',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const region = this.submit.data;
        this.regionId = region.id;
        this.form.reset();
        this.form.setInitialValues(region);

        window.showSuccess(`Region ${regionId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${regionId ? 'updating' : 'creating'} region.`,
          null,
          null,
          'error',
        );
      }
    });
  });
}

const regionFormService = new RegionFormService();

export default regionFormService;
