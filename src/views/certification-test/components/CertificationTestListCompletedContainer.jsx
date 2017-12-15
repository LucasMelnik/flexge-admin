import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestListCompleted from './CertificationTestListCompleted';
import CertificationTestListService from '../services/CertificationTestListService';

class CertificationTestListCompletedContainer extends Component {
  componentDidMount() {
    this.certificationTestListService.init('COMPLETED');
  }

  certificationTestListService = new CertificationTestListService();

  render() {
    return (
      <CertificationTestListCompleted
        certificationTests={toJS(this.certificationTestListService.certificationTests)}
        fetching={this.certificationTestListService.fetch.fetching}
      />
    );
  }
}

export default observer(CertificationTestListCompletedContainer);
