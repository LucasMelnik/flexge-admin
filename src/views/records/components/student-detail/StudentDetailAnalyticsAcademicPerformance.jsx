import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import Async from '../../../../core/layout/Async';
import CircularProgress from '../../../../core/layout/CircularProgress';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';

const StudentDetailAnalyticsAcademicPerformance = props => props.currentPerformance ? (
  <Async fetching={props.loading}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        title="Unit Score Average"
        tooltip="Average score of Units"
        fetching={props.loading}
        noDataText="No data"
        value={props.currentPerformance.averageUnitScore && round(props.currentPerformance.averageUnitScore)}
        max={100}
        successCondition={value => value >= 85}
        badCondition={value => value < 70}
        valueRender={value => `${value}`}
      />
      <ColumnSeparator size="lg" />
      <ColumnSeparator size="lg" />
      <CircularProgress
        title="SR Score Average"
        tooltip="Average score of Speech Recognition"
        fetching={props.loading}
        noDataText="No data"
        value={props.currentPerformance.averageSpeechRecognitionScore && round(props.currentPerformance.averageSpeechRecognitionScore)}
        max={100}
        successCondition={value => value >= 80}
        badCondition={value => value < 70}
        valueRender={value => `${value}`}
      />
      <ColumnSeparator size="lg" />
      <ColumnSeparator size="lg" />
      <CircularProgress
        title="MT Score Average"
        tooltip="Average score of Mastery Tests"
        fetching={props.loading}
        noDataText="No data"
        value={props.currentPerformance.averageMasteryTestScore && round(props.currentPerformance.averageMasteryTestScore)}
        max={100}
        successCondition={value => value >= 85}
        badCondition={value => value < 75}
        valueRender={value => `${value}`}
      />
    </div>
  </Async>
) : null;

StudentDetailAnalyticsAcademicPerformance.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPerformance: PropTypes.shape({
    averageMasteryTestScore: PropTypes.number,
    averageSpeechRecognitionScore: PropTypes.number,
    averageUnitScore: PropTypes.number,
  }).isRequired,
};

export default StudentDetailAnalyticsAcademicPerformance;
