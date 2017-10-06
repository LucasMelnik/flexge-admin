import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';

const StudentDetailContentRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Time',
        path: 'time',
      },
      {
        label: 'Complete',
      },
      {
        label: 'Pontos',
      },
      {
        label: 'Corretas',
      },
      {
        label: 'Nível',
      },
    ]}
    dataSource={props.contents}
  />
);

StudentDetailContentRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailContentRecordList;
