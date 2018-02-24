import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../layout/CircularProgress';

const StudyTimeHigherThanTwoGauge = props => (
  <CircularProgress
    fetching={props.fetching}
    noDataText="No students found"
    title={`${props.weeklyHoursRequired || 1.5} hours last 7 days`}
    tooltip={`Students which studied at least ${props.weeklyHoursRequired || 1.5} hours last 7 days`}
    value={props.value}
    max={100}
    successCondition={value => value > 50}
    badCondition={value => value <= 35}
    valueRender={value => `${value}%`}
    legend={localStorage.role === 'TEACHER' && `School average ${props.schoolAverage}%`}
  />
);

StudyTimeHigherThanTwoGauge.propTypes = {
  fetching: PropTypes.bool.isRequired,
  value: PropTypes.number,
  schoolAverage: PropTypes.number,
  weeklyHoursRequired: PropTypes.number,
};

StudyTimeHigherThanTwoGauge.defaultProps = {
  value: null,
  schoolAverage: null,
  weeklyHoursRequired: 1.5,
};

export default StudyTimeHigherThanTwoGauge;
