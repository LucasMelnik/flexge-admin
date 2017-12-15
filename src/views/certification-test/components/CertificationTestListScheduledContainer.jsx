import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestListScheduled from './CertificationTestListScheduled';
import CertificationTestListService from '../services/CertificationTestListService';

class CertificationTestListScheduledContainer extends Component {
  componentDidMount() {
    this.certificationTestListService.init('SCHEDULED');
  }

  certificationTestListService = new CertificationTestListService();

  render() {
    return (
      <CertificationTestListScheduled
        certificationTests={toJS(this.certificationTestListService.certificationTests)}
        fetching={this.certificationTestListService.fetch.fetching}
      />
    );
  }
}

export default observer(CertificationTestListScheduledContainer);
