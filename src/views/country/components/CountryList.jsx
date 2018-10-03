import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const CountryList = props => (
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
        label: 'Timezone',
        path: 'timezone',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '80px',
        render: (cell, row) => (
          <Button
            icon="edit"
            onClick={() => browserHistory.push(`/countries/${row.id}`)}
          />
        ),
      },
    ]}
    rows={props.countries}
  />
);

CountryList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CountryList;
