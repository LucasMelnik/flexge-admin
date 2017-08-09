import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const CompanyList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
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
        {
          label: 'Actions',
          path: 'action',
          render: (row) => {
            return <Button label="Delete" onClick={() => alert()}/>
          },
        },
      ]}
      rows={props.companies}
      selectable
      onSelect={row => browserHistory.push(`/companies/${row.id}`)}
    />
  </Async>
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
