import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import CircularProgress from '../layout/CircularProgress';

const LastWeekAverageStudiedTimeGauge = props => (
  <CircularProgress
    fetching={props.fetching}
    noDataText="No data found"
    title="Average time last week"
    tooltip="Average studied time from Monday to Sunday last week"
    value={props.value}
    max={props.weeklyHoursRequired || 1.5}
    successCondition={value => props.weeklyHoursRequired ? (value > props.weeklyHoursRequired) : (value > 1.5)}
    badCondition={value => value < 1}
    valueRender={value => moment.duration(value, 'hours').format('hh:mm', { trim: false })}
    legend={localStorage.role === 'TEACHER' &&
    `School average ${
      moment.duration(props.schoolAverage, 'hours').format('hh:mm', { trim: false })}`
    }
  />
);

LastWeekAverageStudiedTimeGauge.propTypes = {
  fetching: PropTypes.bool.isRequired,
  value: PropTypes.number,
  schoolAverage: PropTypes.number,
  weeklyHoursRequired: PropTypes.number,
};

LastWeekAverageStudiedTimeGauge.defaultProps = {
  value: null,
  schoolAverage: null,
  weeklyHoursRequired: 1.5,
};

export default LastWeekAverageStudiedTimeGauge;
