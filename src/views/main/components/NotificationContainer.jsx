import React from 'react';
import { observer } from 'mobx-react';
import NotificationService from '../../../core/services/NotificationService';
import Notification from './Notification';

const NotificationContainer = () => (
  <Notification
    notification={NotificationService.notification}
    isOpen={NotificationService.isOpen}
    onClose={NotificationService.hideNotification}
  />
);

export default observer(NotificationContainer);
