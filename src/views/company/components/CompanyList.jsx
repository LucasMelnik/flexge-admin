import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const CompanyList = props => (
  <Paper
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
            label: 'Social Reason',
            path: 'socialReason',
          },
          {
            label: 'Phone',
            path: 'phone',
          },
        ]}
        rows={props.companies}
        selectable
        onSelect={row => browserHistory.push(`/companies/${row.id}`)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
);

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CompanyList;
