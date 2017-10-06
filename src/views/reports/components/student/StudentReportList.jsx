import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../../core/layout/Async';
import Table from '../../../../core/form/Table';

const StudentList = props => (
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
      ]}
      rows={props.students}
      selectable
      onSelect={row => console.log(row)}
    />
  </Async>
);

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentList;
