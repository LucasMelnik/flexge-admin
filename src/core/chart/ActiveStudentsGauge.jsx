import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../layout/CircularProgress';

const ActiveStudentsGauge = props => (
  <CircularProgress
    title="Students studying on the last 30 days"
    tooltip="Students which studied at least once on last 30 days"
    fetching={props.fetching}
    noDataText="No Study Found"
    value={props.value}
    max={100}
    successCondition={value => value > 85}
    badCondition={value => value <= 65}
    valueRender={value => `${value}%`}
    legend={localStorage.role === 'TEACHER' && `School Average ${props.schoolAverage}%`}
  />
);

ActiveStudentsGauge.propTypes = {
  fetching: PropTypes.bool.isRequired,
  value: PropTypes.number,
  schoolAverage: PropTypes.number,
};

ActiveStudentsGauge.defaultProps = {
  value: null,
  schoolAverage: null,
};

export default ActiveStudentsGauge;
