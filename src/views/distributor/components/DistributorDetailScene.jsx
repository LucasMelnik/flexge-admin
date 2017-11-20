import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import CompanyListContainer from '../../company/components/CompanyListContainer';
import Button from '../../../core/form/Button';

const DistributorDetailScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'Distributors',
          link: '/distributors',
        },
        {
          text: `Distributor - ${props.distributor.name}`,
        },
      ]}
    />
    <Card
      title="Companies"
      loading={props.fetching}
      actions={
        <Button
          label="New company"
          type="primary"
          icon="plus"
          onClick={() => browserHistory.push(`/distributors/${props.distributor.id}/companies/new`)}
        />
      }
    >
      <CompanyListContainer distributorId={props.distributor.id} />
    </Card>
  </div>
);

DistributorDetailScene.propTypes = {
  distributor: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
};

DistributorDetailScene.defaultProps = {
  distributor: {},
};

export default DistributorDetailScene;
