import React from 'react';
import PropTypes from 'prop-types';
import CertificationTestReviewFormContainer from './CertificationTestReviewFormContainer';
import Card from '../../../core/layout/Card';

const CertificationTestReviewControlBar = props => (
  <Card title="Review">
    <CertificationTestReviewFormContainer
      certificationTestId={props.certificationTestId}
    />
  </Card>
);

CertificationTestReviewControlBar.propTypes = {
  certificationTestId: PropTypes.string.isRequired,
};

export default CertificationTestReviewControlBar;
