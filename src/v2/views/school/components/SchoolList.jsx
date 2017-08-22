import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const SchoolList = props => (
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
          label: 'Company',
          path: 'company.name',
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
                  onClick={() => browserHistory.push(props.companyId ? `/v2/companies/${props.companyId}/schools/${row.id}` : `/v2/schools/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.schools}
      selectable
      onSelect={row => browserHistory.push(
        props.companyId && props.distributorId ?
          `/v2/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${row.id}`
          : props.companyId ?
            `/v2/company-detail/${props.companyId}/school-detail/${row.id}`
          :
            `/v2/school-detail/${row.id}`)}
    />
  </Async>
);

SchoolList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  distributorId: PropTypes.string,
  companyId: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SchoolList;
