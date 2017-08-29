import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import CompanyListContainer from '../../company/components/CompanyListContainer';

const DistributorDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Distributors',
          link: '/distributors',
        },
        {
          text: `Distributor - ${props.distributor ? props.distributor.name : '...loading'}`,
        },
      ]}
    />
    <Card title="Companies">
      <CompanyListContainer distributorId={props.distributorId} />
    </Card>
  </div>
);

DistributorDetailScene.propTypes = {
  distributor: PropTypes.object,
  distributorId: PropTypes.string.isRequired,
};

DistributorDetailScene.defaultProps = {
  distributor: null,
};

export default DistributorDetailScene;
