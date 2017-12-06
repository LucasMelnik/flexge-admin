import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const CompanyList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
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
        width: '105px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`${props.baseUrl}/companies/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.companies}
    selectable
    onSelect={row => browserHistory.push(`${props.baseUrl}/companies/${row.id}/details`)}
  />
);

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CompanyList;
