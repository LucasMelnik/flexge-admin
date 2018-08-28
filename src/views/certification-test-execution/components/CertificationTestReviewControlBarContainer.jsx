import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestDetailService from '../services/CertificationTestDetailService';
import CertificationTestReviewControlBar from './CertificationTestReviewControlBar';

const CertificationTestReviewControlBarContainer = props => (
  !CertificationTestDetailService.certificationTest.approvedAt &&
  !CertificationTestDetailService.certificationTest.failedAt
) ? (
  <CertificationTestReviewControlBar certificationTestId={props.certificationTestId} />
  ) : null;

CertificationTestReviewControlBarContainer.propTypes = {
  certificationTestId: PropTypes.string.isRequired,
};

export default observer(CertificationTestReviewControlBarContainer);
