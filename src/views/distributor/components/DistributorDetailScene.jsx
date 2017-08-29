import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import CompanyListScene from '../../company/components/CompanyListScene';

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
    <CompanyListScene distributorId={props.distributorId} />
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
