import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core-ant/Table';

const StudentDetailDateRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Date e hora',
        path: 'startedAt',
        render: (value, row) => (row.children && row.children.length && moment(value).format('DD/MM/YYYY')) || moment(value).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Time',
        path: 'studyTime',
        render: (value) => moment(value).format('mm:ss'),
      },
      {
        label: 'Type',
        path: 'type',
      },
      {
        label: 'Score',
        path: 'score',
      },
      {
        label: 'Unit',
        path: 'unit.name',
      },
      {
        label: 'Module',
        path: 'unit.module.name',
      },
      {
        label: 'Curso',
        path: 'unit.module.course.name',
      },
    ]}
    dataSource={props.contents}
  />
);

StudentDetailDateRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    unit: PropTypes.shape({
      name: PropTypes.string,
      module: PropTypes.shape({
        name: PropTypes.string,
        course: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailDateRecordList;
