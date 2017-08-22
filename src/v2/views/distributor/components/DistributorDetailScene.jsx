import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import CompanyListContainer from '../../company/components/CompanyListContainer';

const DistributorDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Distributors',
          link: '/v2/distributors',
        },
        {
          text: `Distributor - ${props.distributor ? props.distributor.name : '...loading'}`,
        },
      ]}
    />
    <Separator size="md" />
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
