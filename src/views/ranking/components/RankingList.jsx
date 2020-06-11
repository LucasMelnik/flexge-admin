import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Table from '../../../core/form/Table';
import { Roles } from '../../../core/util';

const RankingList = props => (
  <Table
    fetching={props.fetching}
    bordered={false}
    columns={[
      ...[
        {
          label: '#',
          path: 'position',
          sort: true,
          defaultSortOrder: 'ascend',
          className: 'no-padding-column',
          width: '60px',
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
          label: 'Points',
          path: 'points',
          width: '70px',
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
          width: '40%',
          className: 'no-padding-column',
          render: (value, row) => (
            <div
              style={{
                backgroundColor: row.schoolClass.teacher === localStorage.id ? 'rgba(77, 189, 167, 0.5)' : '#fff',
                padding: 16,
              }}
            >
              <Link to={`records/schools/${row.schoolClass.school.id}/classes/${row.schoolClass.id}/students/${row.id}/detail`}>
                {value}
              </Link>
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
      ],
      ...[Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) ? [
        {
          label: 'Course',
          path: 'studentCourse.course.name',
          className: 'no-padding-column',
          width: '80px',
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
      ] : [],
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
