import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import CertificationTestRegisterFormContainer from './CertificationTestRegisterFormContainer';
import CertificationTestRegisterItems from './CertificationTestRegisterItems';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';

const CertificationTestRegisterFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Certification Test',
          link: '/certification-test',
        },
        {
          text: props.params.certificationTestId ? 'Edit Certification Test' : 'Create Certification Test',
        },
      ]}
    />
    <Card
      title={`${props.params.certificationTestId ? 'Update' : 'Create'} Certification Test`}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            onClick={() => browserHistory.push('/certification-test-register')}
          />
        )
      }
    >
      <CertificationTestRegisterFormContainer certificationTestId={props.params.certificationTestId} />
    </Card>
    <Separator size="sm" />
    {props.params.certificationTestId && (
      <CertificationTestRegisterItems certificationTestId={props.params.certificationTestId} />
    )}
  </div>
);

CertificationTestRegisterFormScene.propTypes = {
  params: PropTypes.shape({
    certificationTestId: PropTypes.string,
  }).isRequired,
};

export default CertificationTestRegisterFormScene;
