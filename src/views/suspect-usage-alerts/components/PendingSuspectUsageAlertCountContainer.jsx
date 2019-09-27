import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PendingSuspectUsageAlertCount from './PendingSuspectUsageAlertCount';
import SuspectUsageAlertListService from '../services/SuspectUsageAlertListService';

class PendingSuspectUsageAlertCountContainer extends Component {

  componentDidMount() {
    SuspectUsageAlertListService.countPending();
  }

  render() {
    if (SuspectUsageAlertListService.showPendingAlert) {
      return (
        <PendingSuspectUsageAlertCount
          count={SuspectUsageAlertListService.pendingAlertCount}
        />
      );
    }
    return null;
  }
}

export default observer(PendingSuspectUsageAlertCountContainer);
