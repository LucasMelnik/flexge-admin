import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SuspectUsageAlertList from './SuspectUsageAlertList';
import SuspectUsageAlertListService from '../services/SuspectUsageAlertListService';

class SuspectUsageAlertListContainer extends Component {

  componentDidMount() {
    SuspectUsageAlertListService.init();
  }

  render() {
    return (
      <SuspectUsageAlertList
        alerts={toJS(SuspectUsageAlertListService.alerts)}
        pagination={toJS(SuspectUsageAlertListService.pagination)}
        fetching={SuspectUsageAlertListService.fetch.fetching}
        onChange={SuspectUsageAlertListService.load}
        onDelete={SuspectUsageAlertListService.handleRemove}
        onReview={SuspectUsageAlertListService.initReview}
      />
    );
  }
}

export default observer(SuspectUsageAlertListContainer);
