import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';

const StudentDetailDateRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Date e hora',
        path: 'date',
        sort: true,
      },
      {
        label: 'Time',
        path: 'time',
      },
      {
        label: 'Curso',
      },
      {
        label: 'Unit',
      },
      {
        label: 'Notas',
      },
    ]}
    dataSource={props.contents}
  />
);

StudentDetailDateRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailDateRecordList;
