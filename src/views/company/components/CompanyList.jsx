import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

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
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                <IconButton
                  icon="fa-trash"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <IconButton
                  icon="fa-edit"
                  onClick={() => browserHistory.push(`/companies/${row.id}`)}
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
  </Async>
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
}

export default CompanyList;
