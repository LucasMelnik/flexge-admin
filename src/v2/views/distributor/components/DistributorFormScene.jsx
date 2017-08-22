import React from 'react';
import PropTypes from 'prop-types';
import DistributorFormContainer from './DistributorFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const DistributorFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Distributors',
          link: '/v2/distributors',
        },
        {
          text: props.params.distributorId ? 'Edit Distributor' : 'Create Distributor',
        },
      ]}
    />
    <DistributorFormContainer distributorId={props.params.distributorId} />
  </div>
);

DistributorFormScene.propTypes = {
  params: PropTypes.shape({
    distributorId: PropTypes.string,
  }),
};

DistributorFormScene.defaultProps = {
  params: null,
};

export default DistributorFormScene;
