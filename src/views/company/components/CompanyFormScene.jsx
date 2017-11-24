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
      fetching={props.fetching}
      crumbs={[
        ...(props.distributor && props.distributor.name) ? [
          {
            text: 'Distributors',
            link: '/distributors',
          },
          {
            text: `Distributor - ${props.distributor.name}`,
            link: `/distributors/${props.distributor.id}/details`,
          },
        ] : [],
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
      loading={props.fetching}
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
      <CompanyFormContainer
        companyId={props.companyId}
        currentDistributor={props.currentDistributor}
      />
    </Card>
  </div>
);

CompanyFormScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  companyId: PropTypes.string,
  currentDistributor: PropTypes.string,
  distributor: PropTypes.object,
};

CompanyFormScene.defaultProps = {
  companyId: null,
  currentDistributor: null,
  distributor: {},
};

export default CompanyFormScene;
