import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import WhitelabelConfigFormContainer from './WhitelabelConfigFormContainer';
import Separator from '../../../core/layout/Separator';
import WhitelabelConfigCertificateContainer from './WhitelabelConfigCertificateContainer';
import WhitelabelConfigApplyDomainContainer from './WhitelabelConfigApplyDomainContainer';

const WhitelabelConfigFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.whitelabelConfigId ? 'Edit Whitelabel Config' : 'Create Whitelabel Config'}`,
        },
      ]}
    />
    <Card
      title={props.params.whitelabelConfigId ? 'Edit Whitelabel Config' : 'Create Whitelabel Config'}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <WhitelabelConfigFormContainer whitelabelConfigId={props.params.whitelabelConfigId} />
    </Card>
    {props.params.whitelabelConfigId && (
      <React.Fragment>
        <Separator/>
        <Card
          title="SSL Certificate"
          actions={<WhitelabelConfigApplyDomainContainer />}
        >
          <WhitelabelConfigCertificateContainer whitelabelConfigId={props.params.whitelabelConfigId} />
        </Card>
      </React.Fragment>
    )}
  </div>
);

WhitelabelConfigFormScene.propTypes = {
  params: PropTypes.shape({
    whitelabelConfigId: PropTypes.string,
  }),
};

WhitelabelConfigFormScene.defaultProps = {
  params: null,
};

export default WhitelabelConfigFormScene;
