import React from 'react';
import PropTypes from 'prop-types';
import { formatTimeFromSeconds } from '../../../core/util';
import Table from '../../../core/form/Table';

const UsageStatsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'School',
        path: 'name',
        sort: true,
      },
      {
        label: 'Active Students',
        path: 'activeStudents',
        sort: true,
      },
      {
        label: 'Studied Time',
        path: 'studiedHours',
        sort: true,
        render: value => formatTimeFromSeconds(value),
      },
      {
        label: 'Placement Tests',
        path: 'placementCount',
      },
    ]}
    rows={props.schools}
  />
);

UsageStatsList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UsageStatsList;
