import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';

const RankingList = props => (
  <Table
    fetching={props.fetching}
    bordered={false}
    columns={[
      {
        label: 'Positions',
        path: 'position',
        sort: true,
        defaultSortOrder: 'ascend',
        className: 'no-padding-column',
        render: (value, row) => (
          <div
            style={{
              backgroundColor: row.schoolClass.teacher === localStorage.id ? 'rgba(77, 189, 167, 0.5)' : '#fff',
              padding: 16,
            }}
          >
            {value}
          </div>
        ),
      },
      {
        label: 'Student',
        path: 'name',
        sort: true,
        className: 'no-padding-column',
        render: (value, row) => (
          <div
            style={{
              backgroundColor: row.schoolClass.teacher === localStorage.id ? 'rgba(77, 189, 167, 0.5)' : '#fff',
              padding: 16,
            }}
          >
            {value}
          </div>
        ),
      },
      {
        label: 'School Classes',
        path: 'schoolClass.name',
        className: 'no-padding-column',
        render: (value, row) => (
          <div
            style={{
              backgroundColor: row.schoolClass.teacher === localStorage.id ? 'rgba(77, 189, 167, 0.5)' : '#fff',
              padding: 16,
            }}
          >
            {value}
          </div>
        ),
      },
      {
        label: 'School',
        path: 'schoolClass.school.name',
        className: 'no-padding-column',
        render: (value, row) => (
          <div
            style={{
              backgroundColor: row.schoolClass.teacher === localStorage.id ? 'rgba(77, 189, 167, 0.5)' : '#fff',
              padding: 16,
            }}
          >
            {value}
          </div>
        ),
      },
    ]}
    rows={props.rankings}
  />
);

RankingList.propTypes = {
  rankings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default RankingList;
