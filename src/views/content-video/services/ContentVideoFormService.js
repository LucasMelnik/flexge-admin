import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class ContentVideoFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      contentVideoId: null,
    });
    this.form.validations = {
      name: [isRequired],
      module: [isRequired],
      group: [isRequired],
    };
  }

  handleLoad = action((contentVideoId) => {
    this.form.reset();
    if (contentVideoId) {
      this.fetch.fetch({
        url: `/content-videos/${contentVideoId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.contentVideoId = contentVideoId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const contentVideoId = this.form.getValue('id');
    this.submit.fetch({
      method: contentVideoId ? 'put' : 'post',
      url: contentVideoId ? `/content-videos/${contentVideoId}` : '/content-videos',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const contentVideo = this.submit.data;
        this.contentVideoId = contentVideo.id;
        this.form.reset();
        browserHistory.push('/content-videos');

        NotificationService.addNotification(`Content Video ${contentVideoId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(this.submit.error || `Error ${contentVideoId ? 'updating' : 'creating'} content video.`, 'error');
      }
    });
  });
}
