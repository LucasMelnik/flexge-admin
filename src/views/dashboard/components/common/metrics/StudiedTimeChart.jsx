import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card from '../../../../../core/layout/Card';
import DoughnutChart from '../../../../../core/chart/DoughnutChart';
import Separator from '../../../../../core/layout/Separator';
import { DARK_GREEN, GREEN, ORANGE, RED } from '../../../../../core/chart/colors';
import TopStudentsTableContainer from './TopStudentsTableContainer';

const StudiedTimeChart = (props) => {
  const school = JSON.parse(localStorage.getItem('school'));
  const weeklyHoursRequired = school ? school.weeklyHoursRequired : 2;
  return (
    <Card
      title="Studied time last 7 days"
      loading={props.loading}
    >
      <DoughnutChart
        labels={[
          `More than ${weeklyHoursRequired}h`,
          `Until ${weeklyHoursRequired}h`,
          'Until 1h',
          'Didn\'t study',
        ]}
        data={props.data}
        colors={[DARK_GREEN, GREEN, ORANGE, RED]}
      />
      {props.showDetails && (
        <Separator size="md" />
      )}
      {props.showDetails && (
        <TopStudentsTableContainer
          days={7}
          from={moment().subtract(7, 'days').startOf('day').toDate()}
          to={moment().endOf('day').toDate()}
        />
      )}
    </Card>
  );
};

StudiedTimeChart.propTypes = {
  showDetails: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

StudiedTimeChart.defaultProps = {
  showDetails: true,
};

export default StudiedTimeChart;
