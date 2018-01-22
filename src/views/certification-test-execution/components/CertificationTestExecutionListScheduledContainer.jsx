import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestExecutionListScheduled from './CertificationTestExecutionListScheduled';
import CertificationTestExecutionListService from '../services/CertificationTestExecutionListService';

class CertificationTestExecutionListScheduledContainer extends Component {
  componentDidMount() {
    this.certificationTestListService.init('SCHEDULED');
  }

  certificationTestListService = new CertificationTestExecutionListService();

  render() {
    return (
      <CertificationTestExecutionListScheduled
        certificationTests={toJS(this.certificationTestListService.certificationTests)}
        fetching={this.certificationTestListService.fetch.fetching}
      />
    );
  }
}

export default observer(CertificationTestExecutionListScheduledContainer);
