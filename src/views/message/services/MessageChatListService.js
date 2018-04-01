import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class MessageChatListService {
  fetch = new FetchService();
  markRead = new FetchService();

  constructor() {
    extendObservable(this, {
      messages: [],
      messageChannelId: null,
    });
  }

  init = action((messageChannelId) => {
    this.messages = [];
    this.messageChannelId = messageChannelId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/message-channels/${this.messageChannelId}/messages`,
    }).then(() => {
      if (this.fetch.data) {
        this.messages = this.fetch.data;

        this.fetch.data.filter(message => !message.readAt && message.sender.id !== localStorage.getItem('id')).map((message) => {
          return this.markRead.fetch({
            url: `/message-channels/${message.messageChannel}/messages/${message.id}/read`,
            method: 'patch',
          });
        });
      } else {
        this.messages = [];
      }
    });
  });
}

const messageChatListService = new MessageChatListService();

export default messageChatListService;
