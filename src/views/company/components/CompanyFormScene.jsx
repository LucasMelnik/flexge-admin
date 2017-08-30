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
        ...(props.distributorId) ? [
          {
            text: 'Distributors',
            link: '/distributors',
          },
          {
            text: props.distributor ? `Distributor - ${props.distributor.name}` : 'loading...',
            link: `/distributor-detail/${props.distributorId}`,
          },
        ] : [
          {
            text: 'Companies',
            link: '/companies',
          }
        ],
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
            icon="fa-arrow-left"
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
  distributorId: PropTypes.string,
  companyId: PropTypes.string,
};

CompanyFormScene.defaultProps = {
  distributorId: null,
  companyId: null,
};

export default CompanyFormScene;
