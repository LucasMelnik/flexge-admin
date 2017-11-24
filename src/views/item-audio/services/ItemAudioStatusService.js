import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations/index';

class ItemAudioStatusService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      isOpen: false,
      status: '',
      item: null,
    });
  }

  init = action((status, item) => {
    this.form = new FormService();
    this.form.validations = {
      commentsAudios: status === 'NOT_APPROVED' ? [isRequired] : [],
    };

    this.status = status;
    this.isOpen = true;
    this.item = item;
  });

  handleConfirm = action(() => {
    this.form.setSubmitted();
    const commentsAudios = this.form.getValue('commentsAudios');
    if (this.form.errors || commentsAudios.length === 0 || commentsAudios === '<p><br></p>') {
      NotificationService.addNotification(
        'Please leave a comment to mark as reviewed',
        'error',
      );
      return;
    }
    this.submit = new FetchService();
    this.submit.fetch({
      url: `/item-audio-reviews/${this.item.id}/status`,
      method: 'put',
      body: {
        statusAudio: this.status,
        type: this.item.type,
        commentsAudio: this.form.getValue('commentsAudios'),
      },
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification(
          'Audio uploaded.',
          'success',
        );
        this.isOpen = false;
        this.item = null;
        this.status = null;
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to update the audio',
          'error',
        );
      }
    });
  });

  handleCancel = action(() => {
    this.isOpen = false;
    this.item = null;
    this.status = null;
  });
}

const itemAudioStatusService = new ItemAudioStatusService();

export default itemAudioStatusService;
