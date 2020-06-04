import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class MessageChatListService {
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
    this.connectWebSocket();
    this.load();

    window.addEventListener('message-sent', (() => {
      this.load();
    }));
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/message-channels/${this.messageChannelId}/messages`,
    }).then(() => {
      if (this.fetch.data) {
        this.messages = this.fetch.data;

        if (['TEACHER', 'SCHOOL_MANAGER', 'COMPANY_MANAGER'].some(r => r === localStorage.role)) {
          this.markAsRead();
        }
      } else {
        this.messages = [];
      }
    });
  });

  markAsRead = action(() => {
    this.messages = this.messages.map((message) => {
      if (!message.readAt && message.sender.id !== localStorage.getItem('id')) {
        this.markRead.fetch({
          url: `/message-channels/${message.messageChannel}/messages/${message.id}/read`,
          method: 'patch',
        });
        message.readAt = new Date();
      }
      return message;
    });
  });

  connectWebSocket = action(() => {
    const socketConnection = new WebSocket(`${process.env.REACT_APP_WS_URL}?user=${localStorage.getItem('id')}`);
    socketConnection.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      if (
        notification.type === 'MESSAGE_REPLY' &&
        notification.content.messageChannel === this.messageChannelId
      ) {
        this.load();
      }
    };
    socketConnection.onclose = () => {
    };
    socketConnection.onerror = () => {
    };
  });
}
