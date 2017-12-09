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
