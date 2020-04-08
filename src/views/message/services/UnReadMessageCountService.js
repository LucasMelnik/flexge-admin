import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';

class UnReadMessageCountService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      total: 0,
    });
  }

  init = action(() => {
    this.total = 0;
    this.load();
    this.connectWebSocket();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/received-messages/count-unread',
    }).then(() => {
      if (this.fetch.data) {
        this.total = this.fetch.data.total;
      } else {
        this.total = 0;
      }
    });
  });

  connectWebSocket = action(() => {
    const socketConnection = new WebSocket(`${process.env.REACT_APP_WS_URL}?user=${localStorage.getItem('id')}`);
    socketConnection.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      if (notification.type === 'NEW_CHANNEL') {
        NotificationService.addNotification('You have a new message.', 'info');
        this.load();
      }
      if (notification.type === 'MESSAGE_REPLY') {
        NotificationService.addNotification('You have a new reply.', 'info');
      }
    };
    socketConnection.onclose = () => {
    };
    socketConnection.onerror = () => {
    };
  });
}

const unReadMessageCountService = new UnReadMessageCountService();

export default unReadMessageCountService;
