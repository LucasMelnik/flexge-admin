import { action, extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import ContentVideoUploadService from './ContentVideoUploadService';
import { Roles } from '../../../core/util';

export default class ContentVideoFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      contentVideoId: null,
      availableGroups: [],
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
          this.form.setInitialValues({
            id: this.fetch.data.id,
            name: this.fetch.data.name,
            companies: this.fetch.data.companies,
            module: this.fetch.data.module.id,
            course: this.fetch.data.module.course.id,
            group: this.fetch.data.group,
            videoId: this.fetch.data.unitItem.item.vimeoVideoId
          });
        }
      });
    } else {
      this.form.setInitialValues({
        ...localStorage.role === Roles.COMPANY_MANAGER && {
          companies: [localStorage.company],
        },
      });
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

        if (this.form.getValue('id')) {
          NotificationService.addNotification('Info successfully updated', 'info');
          browserHistory.push('/content-videos');
        } else {
          NotificationService.addNotification('Content created and starting video upload', 'info');
          this.fetch.fetch({
            url: `/content-videos/${this.contentVideoId}`,
          }).then(() => {
            if (this.fetch.data) {
              ContentVideoUploadService.init();
              ContentVideoUploadService.handleUpload(this.form.getValue('video'), this.fetch.data.unitItem.item.vimeoVideoUploadLink)
                .then(() => {
                  NotificationService.addNotification('Video uploaded successfully', 'success');
                  browserHistory.push('/content-videos');
                })
                .catch((error) => {
                  NotificationService.addNotification(`Error uploading video.`, 'error');
                });
            }
          });
        }
      }
      if (this.submit.error) {
        NotificationService.addNotification(this.submit.error || `Error ${contentVideoId ? 'updating' : 'creating'} content video.`, 'error');
      }
    });
  });

  handleLoadAvailableGroups = action((moduleId) => {
    this.fetch.fetch({
      url: `/modules/${moduleId}/available-groups`,
    }).then(() => {
      if (this.fetch.data) {
        this.availableGroups = this.fetch.data.map(group => ({
          value: group.id,
          label: `Phase ${group.id.charCodeAt() - 64}`
        })).concat([{
          value: 'NO_GROUP',
          label: 'End of Module'
        }]);
      }
    });
  });
}
