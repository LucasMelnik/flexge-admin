import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../layout/CircularProgress';

const StudyQualityHigherThanFiveGauge = props => (
  <CircularProgress
    fetching={props.fetching}
    noDataText="No Study Quality found"
    title="Study Quality > 5"
    tooltip="Students with Study Quality higher than 5"
    value={props.value}
    max={100}
    successCondition={value => value > 50}
    badCondition={value => value <= 35}
    valueRender={value => `${value}%`}
    legend={localStorage.role === 'TEACHER' && `School average ${props.schoolAverage}%`
    }
  />
);

StudyQualityHigherThanFiveGauge.propTypes = {
  fetching: PropTypes.bool.isRequired,
  value: PropTypes.number,
  schoolAverage: PropTypes.number,
};

StudyQualityHigherThanFiveGauge.defaultProps = {
  value: null,
  schoolAverage: null,
};

export default StudyQualityHigherThanFiveGauge;
