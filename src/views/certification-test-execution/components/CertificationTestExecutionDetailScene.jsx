import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import CertificationTestExecutionDetailContainer from './CertificationTestExecutionDetailContainer';
import Separator from '../../../core/layout/Separator';
import AbilityItemExecutionListContainer from './AbilityItemExecutionListContainer';
import CertificationTestReviewFormContainer from './CertificationTestReviewFormContainer';
import Button from '../../../core/form/Button';

const CertificationTestExecutionDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Certification Test Detail',
        },
      ]}
    />
    <Card
      title="Certification Test Info"
      actions={
        <Button
          icon="arrow-left"
          label="Back"
          onClick={() => browserHistory.goBack()}
        />
      }
    >
      <CertificationTestExecutionDetailContainer
        certificationTestId={props.params.certificationTestId}
      />
    </Card>
    <Separator />
    <Card title="Reading Items">
      <AbilityItemExecutionListContainer
        certificationTestId={props.params.certificationTestId}
        ability="READING"
      />
    </Card>
    <Separator />
    <Card title="Listening Items">
      <AbilityItemExecutionListContainer
        certificationTestId={props.params.certificationTestId}
        ability="LISTENING"
      />
    </Card>
    <Separator />
    <Card title="Writing Items">
      <AbilityItemExecutionListContainer
        certificationTestId={props.params.certificationTestId}
        ability="WRITING"
      />
    </Card>
    <Separator />
    <Card title="Speaking Items">
      <AbilityItemExecutionListContainer
        certificationTestId={props.params.certificationTestId}
        ability="SPEAKING"
      />
    </Card>
    <Separator />
    {localStorage.role === 'CERTIFICATION_TEST_PROFESSIONAL' && (
      <Card title="Review">
        <CertificationTestReviewFormContainer
          certificationTestId={props.params.certificationTestId}
        />
      </Card>
    )}
  </div>
);

CertificationTestExecutionDetailScene.propTypes = {
  params: PropTypes.shape({
    certificationTestId: PropTypes.string,
  }),
};

CertificationTestExecutionDetailScene.defaultProps = {
  params: null,
};

export default CertificationTestExecutionDetailScene;
