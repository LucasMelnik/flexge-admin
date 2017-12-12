import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestListPending from './CertificationTestListPending';
import CertificationTestListService from '../services/CertificationTestListService';

class CertificationTestListPendingContainer extends Component {
  componentDidMount() {
    this.certificationTestListService.init('PENDING');
  }

  certificationTestListService = new CertificationTestListService();

  render() {
    return (
      <CertificationTestListPending
        certificationTests={toJS(this.certificationTestListService.certificationTests)}
        onChange={this.certificationTestListService.form.setValue}
        values={this.certificationTestListService.form.getValues()}
        errors={this.certificationTestListService.form.errors}
        fetching={this.certificationTestListService.fetch.fetching}
        onSubmitSchedule={this.certificationTestListService.handleSubmitSchedule}
      />
    );
  }
}

export default observer(CertificationTestListPendingContainer);
