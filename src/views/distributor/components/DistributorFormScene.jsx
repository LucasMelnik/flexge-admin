import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import DistributorFormContainer from './DistributorFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';

const DistributorFormScene = props => (
  <div>
    {/*<Breadcrumb*/}
      {/*crumbs={[*/}
        {/*{*/}
          {/*text: 'Distributors',*/}
          {/*link: '/distributors',*/}
        {/*},*/}
        {/*{*/}
          {/*text: props.params.distributorId ? 'Edit Distributor' : 'Create Distributor',*/}
        {/*},*/}
      {/*]}*/}
    {/*/>*/}
    <Card
      title={props.params.distributorId ? 'Update Distributor' : 'Create Distributor'}
      actions={
        <Button
          icon="arrow-left"
          label="Back"
          type="default"
          onClick={() => browserHistory.push('/distributors')}
        />
      }
    >
      <DistributorFormContainer distributorId={props.params.distributorId} />
    </Card>
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
