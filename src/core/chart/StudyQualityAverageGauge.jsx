import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../layout/CircularProgress';

const StudyQualityAverageGauge = props => (
  <CircularProgress
    fetching={props.fetching}
    noDataText="No Study Quality found"
    title="Study Quality"
    tooltip="Your classes Study Quality average"
    value={Number(props.value.toFixed(1)) + 5}
    max={20}
    valueRender={value => Number(value.toFixed(1)) - 5}
    successCondition={value => value > 10}
    badCondition={value => value < 5}
    legend={localStorage.role === 'TEACHER' && `School average ${props.schoolAverage}`}
  />
);

StudyQualityAverageGauge.propTypes = {
  fetching: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  schoolAverage: PropTypes.number,
};

StudyQualityAverageGauge.defaultProps = {
  schoolAverage: null,
};

export default StudyQualityAverageGauge;
