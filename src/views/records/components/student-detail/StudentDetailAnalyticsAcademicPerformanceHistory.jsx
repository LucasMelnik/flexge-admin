import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Tag from '../../../../core/layout/Tag';
import {formatTimeFromSeconds} from '../../../../core/util';

const StudentDetailAnalyticsAcademicPerformanceHistory = props => (
  <Table
    bordered={false}
    showTableCount={false}
    fetching={props.loading}
    rows={props.history}
    columns={[
      {
        label: 'Course',
        path: 'name',
      },
      {
        label: '% complete',
        path: 'coursePercentage',
        render: value => <LinearProgress value={round(value * 100, 1)} />,
      },
      {
        label: 'Studied time',
        path: 'studiedTime',
        align: 'center',
        render: value => formatTimeFromSeconds(value, 'HH:mm'),
      },
      {
        label: 'Start',
        path: 'startedAt',
        width: '100px',
        align: 'center',
        render: value => moment(value).format('DD/MM/YYYY'),
      },
      {
        label: 'End',
        path: 'completedAt',
        width: '100px',
        align: 'center',
        render: value => value ? moment(value).format('DD/MM/YYYY') : '-',
      },
      {
        label: 'Average Unit Score',
        path: 'averageUnitScore',
        align: 'center',
        render: value => value && (
          <div style={{ textAlign: 'center' }}>
            <Tag
              color={value >= 85 ? 'green' : (value < 85 && value >= 70) ? 'orange' : 'red'}
            >
              {round(value, 2)}
            </Tag>
          </div>
        ),
      },
      {
        label: 'Average SR Score',
        path: 'averageSpeechRecognitionScore',
        align: 'center',
        render: value => value && (
          <Tag
            color={props.student.academicPlan.key === 'KIDS' ? (
              value >= 60 ? 'green' : (value < 60 && value >= 50) ? 'orange' : 'red'
            ) : (
              value >= 80 ? 'green' : (value < 80 && value >= 70) ? 'orange' : 'red'
            )}
          >
            {round(value, 2)}
          </Tag>
        ),
      },
      {
        label: 'Average Mastery Test Score',
        path: 'averageMasteryTestScore',
        align: 'center',
        render: value => value && (
          <Tag
            color={value >= 85 ? 'green' : (value < 85 && value >= 75) ? 'orange' : 'red'}
          >
            {round(value, 2)}
          </Tag>
        ),
      },
    ]}
  />
);

StudentDetailAnalyticsAcademicPerformanceHistory.propTypes = {
  student: PropTypes.shape({
    academicPlan: PropTypes.shape({
      key: PropTypes.string
    })
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentDetailAnalyticsAcademicPerformanceHistory;
