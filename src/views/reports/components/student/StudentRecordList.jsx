import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';

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
      },
      {
        label: 'Tempo de estudo',
      },
      {
        label: 'Dias sem estudos',
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
