import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../layout/CircularProgress';

const ActiveStudentsLastSevenDaysGauge = props => (
  <CircularProgress
    fetching={props.fetching}
    noDataText="No students found"
    title="Active Students 7 days"
    tooltip="Students which studied at least once in the last 7 days"
    value={props.value}
    max={100}
    successCondition={value => value > 50}
    badCondition={value => value <= 35}
    valueRender={value => `${value}%`}
    legend={localStorage.role === 'TEACHER' && `School average ${props.schoolAverage}%`}
  />
);

ActiveStudentsLastSevenDaysGauge.propTypes = {
  fetching: PropTypes.bool.isRequired,
  value: PropTypes.number,
  schoolAverage: PropTypes.number,
};

ActiveStudentsLastSevenDaysGauge.defaultProps = {
  value: null,
  schoolAverage: null,
};

export default ActiveStudentsLastSevenDaysGauge;
