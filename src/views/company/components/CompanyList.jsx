import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const CompanyList = props => (
  <Table
    loading={props.fetching}
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
        width: '85px',
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
                onClick={() => browserHistory.push(props.distributorId ?
                `/distributors/${props.distributorId}/companies/${row.id}` :
                `/companies/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.companies}
    selectable
    onSelect={row => browserHistory.push(props.distributorId ? `/distributor-detail/${props.distributorId}/company-detail/${row.id}` : `/company-detail/${row.id}/`)}
  />
);

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  distributorId: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

CompanyList.defaultProps = {
  distributorId: null,
};

export default CompanyList;
