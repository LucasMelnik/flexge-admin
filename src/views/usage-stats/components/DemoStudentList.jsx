import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';

const DemoStudentList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'ID',
        path: 'id',
      },
       {
        label: 'Name',
        path: 'name',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'School',
        path: 'schoolClass.school.name',
      },
      {
        label: 'School Class',
        path: 'schoolClass.name',
      },
    ]}
    rows={props.students}
  />
);

DemoStudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default DemoStudentList;
