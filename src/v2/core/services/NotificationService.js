import { extendObservable, action } from 'mobx';

class NotificationService {
  constructor() {
    extendObservable(this, {
      isOpen: false,
      notification: {},
    });
  }

  // notification: PropTypes.shape({
  //   message: PropTypes.string,
  //   action: PropTypes.string,
  //   onClick: PropTypes.func,
  //   type: PropTypes.oneOf(['success', 'warning', 'danger']),
  // }
  addNotification = action((message, notificationAction, onClick, type) => {
    this.isOpen = true;
    this.notification = {
      message,
      action: notificationAction,
      onClick,
      type,
    };
  })

  hideNotification = action(() => {
    this.isOpen = false;
    this.notification = {};
  })
}

const notificationService = new NotificationService();

export default notificationService;
