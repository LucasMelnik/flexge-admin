import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import WhitelabelConfigFormContainer from './WhitelabelConfigFormContainer';
import Separator from '../../../core/layout/Separator';
import WhitelabelConfigWebDistributionContainer from './WhitelabelConfigWebDistributionContainer';
import WhitelabelConfigMobileDistributionListContainer from './WhitelabelConfigMobileDistributionListContainer';
import WhitelabelConfigMobileDistributionFormContainer from './WhitelabelConfigMobileDistributionFormContainer';

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
        <Card title="Web Distributions Config">
          <WhitelabelConfigWebDistributionContainer whitelabelConfigId={props.params.whitelabelConfigId} />
        </Card>
        <Separator/>
        <Card title="Mobile Distributions Config">
          <WhitelabelConfigMobileDistributionListContainer whitelabelConfigId={props.params.whitelabelConfigId} />
          <WhitelabelConfigMobileDistributionFormContainer />
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
