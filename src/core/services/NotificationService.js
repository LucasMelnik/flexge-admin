import { action } from 'mobx';
import { notification } from 'antd';

class NotificationService {

  addNotification = action((message, type) => {
    notification[type]({
      message,
    });
  });
}

const notificationService = new NotificationService();

export default notificationService;
