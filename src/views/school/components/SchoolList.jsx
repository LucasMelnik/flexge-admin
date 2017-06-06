import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const SchoolList = props => (
  <Card
    flexible
  >
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'name',
          },
          {
            label: 'Company',
            path: 'company',
          },
        ]}
        rows={props.schools}
        selectable
        onSelect={row => browserHistory.push(`/schools/${row.id}`)}
        onDelete={row => props.onDelete(row.id)}
      />
    </Async>
  </Card>
);

SchoolList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SchoolList;
