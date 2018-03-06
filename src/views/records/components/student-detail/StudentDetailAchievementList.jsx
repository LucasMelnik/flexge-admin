import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import Table from '../../../../core/form/Table';

const StudentDetailAchievementList = props => (
  <Table
    rows={props.achievements}
    columns={[
      {
        label: 'Achievement',
        path: 'achievement',
        width: 100,
        align: 'center',
        render: (achievement, row) => achievement && (
          <img
            alt="icon"
            src={`${process.env.REACT_APP_API_URL}/files/${achievement.iconByPosition.find(icon => icon.position === row.position).icon}`}
          />
        ),
      },
      {
        label: 'Position',
        path: 'position',
        width: 80,
        align: 'center',
      },
      {
        label: 'Date',
        path: 'achievedAt',
        render: value => moment(value).format('MMMM/YYYY'),
        width: 110,
      },
      {
        label: '',
        path: 'id',
        render: (value, row) => (
          <span>
            You were the {get({
              1: 'First',
              2: 'Second',
              3: 'Third',
          }, row.position, `${row.position}th`)} of your {{
            NATIONAL: 'Country',
            REGIONAL: 'Region',
            SCHOOL: 'School',
          }[row.achievement.level]}
          </span>
        )
      },
    ]}
  />
);

StudentDetailAchievementList.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentDetailAchievementList;
