import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestExecutionListCompleted from './CertificationTestExecutionListCompleted';
import CertificationTestExecutionListService from '../services/CertificationTestExecutionListService';

class CertificationTestExecutionListCompletedContainer extends Component {
  componentDidMount() {
    this.certificationTestListService.init('COMPLETED');
  }

  certificationTestListService = new CertificationTestExecutionListService();

  render() {
    return (
      <CertificationTestExecutionListCompleted
        certificationTests={toJS(this.certificationTestListService.certificationTests)}
        fetching={this.certificationTestListService.fetch.fetching}
      />
    );
  }
}

export default observer(CertificationTestExecutionListCompletedContainer);
