import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestExecutionListPending from './CertificationTestExecutionListPending';
import CertificationTestExecutionListService from '../services/CertificationTestExecutionListService';

class CertificationTestExecutionListPendingContainer extends Component {
  componentDidMount() {
    this.certificationTestListService.init('PENDING');
  }

  certificationTestListService = new CertificationTestExecutionListService();

  render() {
    return (
      <CertificationTestExecutionListPending
        certificationTests={toJS(this.certificationTestListService.certificationTests)}
        fetching={this.certificationTestListService.fetch.fetching}
        onLoad={this.certificationTestListService.load}
      />
    );
  }
}

export default observer(CertificationTestExecutionListPendingContainer);
