import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import CertificationTestExecutionDetailContainer from './CertificationTestExecutionDetailContainer';
import Separator from '../../../core/layout/Separator';
import AbilityItemExecutionListContainer from './AbilityItemExecutionListContainer';

const CertificationTestExecutionDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Certification Test Detail',
        },
      ]}
    />
    <Card title="Certification Test">
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
