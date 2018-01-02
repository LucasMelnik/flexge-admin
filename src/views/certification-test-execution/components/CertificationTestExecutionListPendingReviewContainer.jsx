import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestExecutionListPendingReview from './CertificationTestExecutionListPendingReview';
import CertificationTestExecutionListService from '../services/CertificationTestExecutionListService';

class CertificationTestExecutionListPendingReviewContainer extends Component {
  componentDidMount() {
    this.certificationTestListService.init('PENDING_REVIEW');
  }

  certificationTestListService = new CertificationTestExecutionListService();

  render() {
    return (
      <CertificationTestExecutionListPendingReview
        certificationTests={toJS(this.certificationTestListService.certificationTests)}
        fetching={this.certificationTestListService.fetch.fetching}
      />
    );
  }
}

export default observer(CertificationTestExecutionListPendingReviewContainer);
