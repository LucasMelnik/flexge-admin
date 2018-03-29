import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import range from 'lodash/range';
import Card from '../../../../../core/layout/Card';
import LineChart from '../../../../../core/chart/LineChart';
import { getLabel } from './utils';

const WeeklyStudyingStudentsChart = props => (
  <Card
    title="Active Students By Week"
    loading={props.loading}
  >
    <LineChart
      height={350}
      labels={range(1, moment().add(1, 'week').format('WW')).map(week => getLabel(week))}
      data={range(1, moment().add(1, 'week').format('WW')).map(week => props.data.find(item => item.week === week) || {})}
      dataFormat={[
        {
          label: 'Total Students',
          valueRender: item => item.totalStudents || 0,
        },
        {
          label: 'Active Students',
          valueRender: item => item.totalStudyingStudents || 0,
        },
      ]}
    />
  </Card>
);

WeeklyStudyingStudentsChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

WeeklyStudyingStudentsChart.defaultProps = {
  data: [],
};

export default WeeklyStudyingStudentsChart;
