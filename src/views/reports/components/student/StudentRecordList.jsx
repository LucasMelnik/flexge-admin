import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';
import moment from 'moment';

const StudentRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Nível inicial (PT)',
        path: 'reachedLevel',
      },
      {
        label: 'Tempo de estudo',
      },
      {
        label: 'Last time studied',
        path: 'lastStudentAccess',
        render: (cell, row) => {
          return (
            <div>{moment(row.lastStudentAccess).fromNow()}</div>
          )
        },
      },
      {
        label: 'Curso atual',
      },
      {
        label: 'Nível atual',
      },
    ]}
    dataSource={props.students}
    onSelect={props.onSelect}
  />
);

StudentRecordList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentRecordList;
