import React from 'react';
import PropTypes from 'prop-types';
import CertificationTestReviewFormContainer from './CertificationTestReviewFormContainer';
import Card from '../../../core/layout/Card';

const CertificationTestReviewControlBar = props => (
  <div>
    <div style={{ height: 400 }} />
    <div
      style={{
        position: 'fixed',
        zIndex: 3,
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '89%',
        transition: 'all 1s',
        backgroundColor: '#fff',
      }}
    >
      <Card title="Review">
        <CertificationTestReviewFormContainer
          certificationTestId={props.certificationTestId}
        />
      </Card>
    </div>
  </div>
);

CertificationTestReviewControlBar.propTypes = {
  certificationTestId: PropTypes.number.isRequired,
};

export default CertificationTestReviewControlBar;
