import { extendObservable, action } from 'mobx';

class NotificationService {

  constructor() {
    extendObservable(this, {
      notifications: [],
    });
  }

  addNotification = action((message, notificationAction, onClick, type) => {
    this.notifications.push({
      message,
      action: notificationAction,
      onClick,
      type,
    });

    setTimeout(action(() => {
      if (this.notifications.length) {
        this.notifications = this.notifications.splice(1);
      }
    }), 3000);
  });
}

const notificationService = new NotificationService();

export default notificationService;
