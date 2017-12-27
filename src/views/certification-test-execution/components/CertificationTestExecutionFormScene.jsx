import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CertificationTestExecutionFormContainer from './CertificationTestExecutionFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const CertificationTestExecutionFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Enable Certification Test',
        },
      ]}
    />
    <Card
      title="Enable Certification Test"
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
      <CertificationTestExecutionFormContainer certificationTestId={props.params.certificationTestId} />
    </Card>
  </div>
);

CertificationTestExecutionFormScene.propTypes = {
  params: PropTypes.shape({
    certificationTestId: PropTypes.string,
  }),
};

CertificationTestExecutionFormScene.defaultProps = {
  params: null,
};

export default CertificationTestExecutionFormScene;
