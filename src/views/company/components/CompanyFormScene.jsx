import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CompanyFormContainer from './CompanyFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const CompanyFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
          link: '/companies',
        },
        {
          text: `${props.companyId ? 'Edit Company' : 'Create Company'}`,
        },
      ]}
    />
    <Card
      title={props.companyId ? 'Edit Company' : 'Create Company'}
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
      <CompanyFormContainer companyId={props.companyId} />
    </Card>
  </div>
);

CompanyFormScene.propTypes = {
  companyId: PropTypes.string,
};

CompanyFormScene.defaultProps = {
  companyId: null,
};

export default CompanyFormScene;
