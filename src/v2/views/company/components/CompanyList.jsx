import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';

const CompanyList = props => (
  <Card>
    <Async fetching={props.fetching}>
      <Table
        // id="datatable"
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
  </Card>
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
