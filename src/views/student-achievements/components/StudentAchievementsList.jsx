import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const StudentAchievementsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Achievement',
        path: 'achievement',
        defaultSortOrder: 'asc',
        width: 150,
        render: (achievement, row) => achievement ? (
          <img
            alt="icon"
            src={`${process.env.REACT_APP_API_URL}/files/${achievement.iconByPosition.find(icon => icon.position === row.position).icon}`}
          />
        ) : row.name,
      },
      {
        label: 'Position',
        path: 'position',
        width: 80,
        align: 'center',
      },
      {
        label: 'Level',
        path: 'achievement.level',
        render: (level, row) => {
          switch (level) {
            case 'NATIONAL':
              return row.student.schoolClass.school.company.country.name;
            case 'REGIONAL':
              return row.student.schoolClass.school.region.name;
            case 'SCHOOL':
              return row.student.schoolClass.school.name;
            default:
              return '-';
          }
        },
      },
      {
        label: 'Student',
        path: 'student.name',
      },
      // {
      //   label: 'Actions',
      //   path: 'action',
      //   width: '80px',
      //   render: (cell, row) => !row.children && (
      //     <div>
      //       <Button
      //         icon="download"
      //         onClick={() => props.onDownload(row)}
      //       />
      //     </div>
      //   ),
      // },
    ]}
    rows={props.achievements}
    showTableCount={false}
  />
);

StudentAchievementsList.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default StudentAchievementsList;
