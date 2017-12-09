import React from 'react';
import StudyQualityAverageContainer from './StudyQualityAverageContainer';
import StudyQualityHigherThanFiveContainer from './StudyQualityHigherThanFiveContainer';
import ActiveStudentsContainer from './ActiveStudentsContainer';
import StudyTimeHigherThanTwoContainer from './StudyTimeHigherThanTwoContainer';
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

const PerformanceGoals = () => (
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
      <StudyQualityAverageContainer />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <StudyQualityHigherThanFiveContainer />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <ActiveStudentsContainer />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <ActiveStudentsLastSevenDaysContainer />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <StudyTimeHigherThanTwoContainer />
    </PerformanceGoalWrapper>
    <PerformanceGoalWrapper>
      <LastWeekAverageStudiedTimeContainer />
    </PerformanceGoalWrapper>
  </div>
);

export default PerformanceGoals;
