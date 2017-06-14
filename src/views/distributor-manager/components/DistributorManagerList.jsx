import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const DistributorManagerList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'Name',
          path: 'name',
        },
        {
          label: 'Email',
          path: 'email',
        },
      ]}
      rows={props.managers}
      onSelect={row => props.onRowClick(row)}
      onDelete={row => props.onDelete(row)}
    />
  </Async>
);

DistributorManagerList.propTypes = {
  managers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DistributorManagerList;
