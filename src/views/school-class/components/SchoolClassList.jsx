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
          label: 'School',
          path: 'school.name',
        },
        {
          label: 'Teacher',
          path: 'teacher.name',
        },
        {
          label: 'Number Students',
          path: 'students',
          render: (cell, row) => {
            return (
              <div>
                {cell.length}
              </div>
            );
          },
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
                  onClick={() => browserHistory.push(props.distributorId ?
                `/distributors/${props.distributorId}/companies/${props.companyId}/schools/${props.schoolId}/classes/${row.id}` :
                  props.companyId ? `/companies/${props.companyId}/schools/${props.schoolId}/classes/${row.id}` :
                  props.schoolId ? `/schools/${props.schoolId}/classes/${row.id}` : `/classes/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.schools}
      selectable
      onSelect={row => browserHistory.push(
        props.companyId && props.distributorId && props.schoolId ?
          `/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${row.id}`
        : props.companyId && props.schoolId ?
          `/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${row.id}`
        : `/school-detail/${row.school.id}/class-detail/${row.id}`)}
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
  companyId: PropTypes.string,
  schoolId: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

SchoolClassList.defaultProps = {
  distributorId: null,
  schoolId: null,
  companyId: null,
};

export default SchoolClassList;
