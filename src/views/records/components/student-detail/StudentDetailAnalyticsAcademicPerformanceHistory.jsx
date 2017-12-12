import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Tag from '../../../../core/layout/Tag';

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
        path: 'availablePoints',
        render: (value, row) => <LinearProgress value={round((row.conqueredPoints / value) * 100, 2)} />,
      },
      {
        label: 'Average Unit Score',
        path: 'averageUnitScore',
        render: value => value && (
          <Tag
            color={value >= 85 ? 'green' : (value < 85 && value >= 70) ? 'orange' : 'red'}
          >
            {round(value, 2)}
          </Tag>
        ),
      },
      {
        label: 'Average SR Score',
        path: 'averageSpeechRecognitionScore',
        render: value => value && (
          <Tag
            color={value >= 90 ? 'green' : (value < 90 && value >= 80) ? 'orange' : 'red'}
          >
            {round(value, 2)}
          </Tag>
        ),
      },
      {
        label: 'Average Mastery Test Score',
        path: 'averageMasteryTestScore',
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
  loading: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentDetailAnalyticsAcademicPerformanceHistory;
