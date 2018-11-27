import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const ConfigurationList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Academic Plans',
        path: 'academicPlans',
        render: cell => cell.reduce((acc, item) => acc.concat(item.name).concat(', '), '')
      },
      {
        label: 'Actions',
        path: 'action',
        width: '80px',
        render: (cell, row) => (
          <Button
            icon="edit"
            onClick={() => browserHistory.push(`/configurations/${row.id}`)}
          />
        ),
      },
    ]}
    rows={props.configurations}
  />
);

ConfigurationList.propTypes = {
  configurations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ConfigurationList;
