import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const SchoolClassList = props => (
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
          label: 'Teacher',
          path: 'teacher.name',
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
                  onClick={() => browserHistory.push(`/v2/companies/${props.companyId}/schools/${props.schoolId}/classes/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.schools}
      selectable
      onSelect={row => browserHistory.push(props.companyId && props.distributorId && props.schoolId ? `/v2/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${row.id}` : `/v2/class-detail/${row.id}`)}
    />
  </Async>
);

SchoolClassList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  distributorId: PropTypes.string,
  companyId: PropTypes.string.isRequired,
  schoolId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SchoolClassList;
