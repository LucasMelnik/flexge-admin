import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const StudentList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        ...[{
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
          label: 'Email',
          path: 'email',
        },
        {
          label: 'School',
          path: 'school.name',
        },
        {
          label: 'School Class',
          path: 'schoolClass.name',
        },
        {
          label: 'Last PT',
          path: 'lastPlacementResult',
          render: (cell) => {
            if (cell === -2) {
              return 'N/A';
            } else if (cell === -1) {
              return 'Não Finalizado';
            }
            return cell;
          },
        }],
        ...props.editable && [{
          label: 'Actions',
          width: '120',
          render: (cell, row) => (
            <div>
              <IconButton
                icon="fa-trash"
                onClick={() => props.onDelete(row)}
              />
              {' '}
              <IconButton
                icon="fa-edit"
                onClick={() => props.distributorId ?
                    browserHistory.push(`/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${props.classId}/students/${row.id}`) :
                  props.companyId ?
                    browserHistory.push(`/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${props.classId}/students/${row.id}`) :
                  props.schoolId ?
                    browserHistory.push(`/school-detail/${props.schoolId}/class-detail/${props.classId}/students/${row.id}`) :
                  props.classId ?
                    browserHistory.push(`/class-detail/${props.classId}/students/${row.id}`) :
                    browserHistory.push(`/students/${row.id}`)}
              />
            </div>
            ),
        }],
      ]}
      rows={props.students}
      selectable={!!props.onSelect}
      onSelect={row => props.onSelect && props.onSelect(row.id)}
    />
  </Async>
);

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  companyId: PropTypes.string,
  schoolId: PropTypes.string,
  classId: PropTypes.string,
  distributorId: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

StudentList.defaultProps = {
  companyId: null,
  classId: null,
  schoolId: null,
  distributorId: null,
  onSelect: null,
};

export default StudentList;
