import React from 'react';
import CircularProgress from '../../../../../core/layout/CircularProgress';
import Card from '../../../../../core/layout/Card';
import StudyQualityAverageContainer from './StudyQualityAverageContainer';
import StudyQualityHigherThanFiveContainer from './StudyQualityHigherThanFiveContainer';
import ActiveStudentsContainer from './ActiveStudentsContainer';
import StudyTimeHigherThanTwoContainer from './StudyTimeHigherThanTwoContainer';
import ActiveStudentsLastSevenDaysContainer from './ActiveStudentsLastSevenDaysContainer';

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
      {/* // TODO  fix to use values from school config */}
      <CircularProgress
        title="Average time last week"
        tooltip="From Monday to Sunday of last week"
        value={60}
        max={100}
        successCondition={value => value > 50}
        badCondition={value => value <= 1}
        valueRender={() => '01:53'}
        legend={localStorage.role === 'TEACHER' && 'School average 01:13'}
      />
    </PerformanceGoalWrapper>
  </div>
);

export default PerformanceGoals;
