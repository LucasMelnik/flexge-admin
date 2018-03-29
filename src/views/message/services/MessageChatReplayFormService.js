import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import MessageChatListService from './MessageChatListService';

export default class MessageChatReplayFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      messageChannelId: null,
    });
    this.form.validations = {
      text: [isRequired],
    };
    this.form.setInitialValues({});
  }

  init = action((messageChannelId) => {
    this.messageChannelId = messageChannelId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }

    this.submit.fetch({
      method: 'post',
      url: `/message-channels/${this.messageChannelId}/messages`,
      body: {
        text: this.form.getValue('text'),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        MessageChatListService.load(true);
      }
      if (this.submit.error) {
        NotificationService.addNotification('Erro to send the message', 'error');
      }
    });
  });
}
