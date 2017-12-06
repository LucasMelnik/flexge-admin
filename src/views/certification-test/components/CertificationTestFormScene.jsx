import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CertificationTestFormContainer from './CertificationTestFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const CertificationTestFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.certificationTestId ? 'Edit Certification Test' : 'Create Certification Test'}`,
        },
      ]}
    />
    <Card
      title={props.params.certificationTestId ? 'Edit Certification Test' : 'Create Certification Test'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <CertificationTestFormContainer certificationTestId={props.params.certificationTestId} />
    </Card>
  </div>
);

CertificationTestFormScene.propTypes = {
  params: PropTypes.shape({
    certificationTestId: PropTypes.string,
  }),
};

CertificationTestFormScene.defaultProps = {
  params: null,
};

export default CertificationTestFormScene;
