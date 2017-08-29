import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import NotificationService from '../../../core/services/NotificationService';
import Notification from '../../../core/layout/Notification';

const NotificationContainer = () => (
  <Notification
    notifications={toJS(NotificationService.notifications)}
  />
);

export default observer(NotificationContainer);
