import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card from '../../../../../core/layout/Card';
import DoughnutChart from '../../../../../core/chart/DoughnutChart';
import { DARK_RED, DARK_GREEN, GREEN, ORANGE, RED } from '../../../../../core/chart/colors';
import Separator from '../../../../../core/layout/Separator';
import TopStudentsTableContainer from './TopStudentsTableContainer';

const ActiveStudentsByPeriodChart = props => (
  <Card
    title="Active Students Last 30 Days"
  >
    {!props.loading && (
      <DoughnutChart
        labels={[
          'Active last 7 days',
          'Active last 14 days',
          'Active last 21 days',
          'Active last 30 days',
          'Didn\'t study',
        ]}
        data={props.data}
        colors={[DARK_GREEN, GREEN, ORANGE, RED, DARK_RED]}
      />
    )}
    {props.showDetails && (
      <Separator size="md" />
    )}
    {props.showDetails && (
      <TopStudentsTableContainer
        days={30}
        from={moment().subtract(30, 'days').startOf('day').toDate()}
        to={moment().endOf('day').toDate()}
      />
    )}
  </Card>
);

ActiveStudentsByPeriodChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  showDetails: PropTypes.bool,
  data: PropTypes.array,
};

ActiveStudentsByPeriodChart.defaultProps = {
  showDetails: true,
  data: [],
};

export default ActiveStudentsByPeriodChart;
