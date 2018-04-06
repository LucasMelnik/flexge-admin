import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

export default class ProfileFormService {
  fetch = new FetchService();
  submit = new FetchService();
  submitPicture = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this);
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      password: [(value, all) => value && !all.newPassword && 'Required'],
      newPassword: [(value, all) => value && !all.password && 'Required'],
    };
  }

  handleLoad = action(() => {
    this.form.reset();
    this.fetch.fetch({
      url: '/profile',
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues(this.fetch.data);
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    this.submit.fetch({
      method: 'put',
      url: '/profile',
      body: {
        name: this.form.getValue('name'),
        email: this.form.getValue('email'),
        ...this.form.getValue('password') && {
          password: this.form.getValue('password'),
        },
        ...this.form.getValue('newPassword') && {
          newPassword: this.form.getValue('newPassword'),
        },
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        this.form.setInitialValues(this.submit.data);
        NotificationService.addNotification('Profile updated', 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification('Error to update the profile', 'error');
      }
    });
  });

  handleChangePicture = action((imageBlob) => {
    const formData = new FormData();
    formData.append('image', imageBlob);

    this.submitPicture.fetch({
      method: 'post',
      url: '/profile-picture',
      body: formData,
    }).then(() => {
      if (this.submitPicture.data) {
        this.form.reset();
        this.form.setInitialValues(this.submitPicture.data);
        NotificationService.addNotification('Picture updated', 'success');
      }
      if (this.submitPicture.error) {
        NotificationService.addNotification('Error to update the picture', 'error');
      }
    });
  })
}
