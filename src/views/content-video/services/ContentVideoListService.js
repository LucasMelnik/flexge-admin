import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import FormService from '../../../core/services/FormService';

class ContentVideoListService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      contentVideos: [],
    });
  }

  init = action(() => {
    this.contentVideos = [];
    this.form.setInitialValues({});
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/content-videos',
      query: {
        query: this.form.getValues(),
      },
    }).then(() => {
      if (this.fetch.data) {
        this.contentVideos = this.fetch.data;
      } else {
        this.contentVideos = [];
      }
    });
  });

  handleRemove = action((character) => {
    ConfirmationDialogService.show(
      'Delete Content Video',
      `You are about to delete the Content Video "${character.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/content-videos/${character.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Content Video "${character.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });

  handleReview = action((unitId, status) => {
    this.submit.fetch({
      method: 'patch',
      url: `/content-videos/${unitId}/review`,
      body: {
        status,
      },
    }).then((res) => {
      if (res) {
        this.load();
        NotificationService.addNotification(
          'Status changed successfully.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error changing status review.',
          'error',
        );
      }
    });
  });
}

const characterListService = new ContentVideoListService();

export default characterListService;
