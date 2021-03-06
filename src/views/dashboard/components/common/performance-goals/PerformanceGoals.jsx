import React from 'react';
import PropTypes from 'prop-types';
import StudyQualityAverageContainer from './StudyQualityAverageContainer';
import StudyQualityHigherThanFiveContainer from './StudyQualityHigherThanFiveContainer';
import ActiveStudentsContainer from './ActiveStudentsContainer';
import WeeklyHoursStatsContainer from './WeeklyHoursStatsContainer';
import ActiveStudentsLastSevenDaysContainer from './ActiveStudentsLastSevenDaysContainer';
import LastWeekAverageStudiedTimeContainer from './LastWeekAverageStudiedTimeContainer';

const PerformanceGoalWrapper = props => (
  <div
    style={{
      flex: '0 0 200px',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 15,
      paddingRight: 15,
    }}
  >
    {props.children}
  </div>
);

const PerformanceGoals = props => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: -15,
      marginRight: -15,
    }}
  >
    <PerformanceGoalWrapper>
      <StudyQualityAverageContainer
        classId={props.classId}
        schoolId={props.schoolId}
        query={props.query}
      />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <StudyQualityHigherThanFiveContainer
        classId={props.classId}
        schoolId={props.schoolId}
        query={props.query}
      />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <ActiveStudentsContainer
        classId={props.classId}
        schoolId={props.schoolId}
        query={props.query}
      />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <ActiveStudentsLastSevenDaysContainer
        classId={props.classId}
        schoolId={props.schoolId}
        query={props.query}
      />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <WeeklyHoursStatsContainer
        classId={props.classId}
        schoolId={props.schoolId}
        query={props.query}
      />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <LastWeekAverageStudiedTimeContainer
        classId={props.classId}
        schoolId={props.schoolId}
        query={props.query}
      />
    </PerformanceGoalWrapper>
  </div>
);

PerformanceGoals.propTypes = {
  classId: PropTypes.string,
  schoolId: PropTypes.string,
  query: PropTypes.object,
};

PerformanceGoals.defaultProps = {
  classId: null,
  schoolId: null,
  query: null,
};

export default PerformanceGoals;
