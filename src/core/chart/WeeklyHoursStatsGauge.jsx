import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../layout/CircularProgress';

const WeeklyHoursStatsGauge = props => (
  <CircularProgress
    fetching={props.fetching}
    noDataText="No students found"
    title="Hours stats of last 7 days"
    tooltip="Students which studied more than the classroom weekly required hours last 7 days"
    value={props.value}
    max={100}
    successCondition={value => value > 50}
    badCondition={value => value <= 35}
    valueRender={value => `${value}%`}
    legend={localStorage.role === 'TEACHER' && `School average ${props.schoolAverage}%`}
  />
);

WeeklyHoursStatsGauge.propTypes = {
  fetching: PropTypes.bool.isRequired,
  value: PropTypes.number,
  schoolAverage: PropTypes.number,
};

WeeklyHoursStatsGauge.defaultProps = {
  value: null,
  schoolAverage: null,
};

export default WeeklyHoursStatsGauge;
