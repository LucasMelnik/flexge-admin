import React from 'react';
import CircularProgress from '../../../../core/layout/CircularProgress';
import Card from '../../../../core/layout/Card';
import PerformanceGoalsStudyQualityAverageContainer from './PerformanceGoalsStudyQualityAverageContainer';
import PerformanceGoalsStudyQualityHigherThanFiveContainer from './PerformanceGoalsStudyQualityHigherThanFiveContainer';
import PerformanceGoalsActiveStudentsContainer from './PerformanceGoalsActiveStudentsContainer';
import PerformanceGoalsStudyTimeHigherThanTwoContainer from './PerformanceGoalsStudyTimeHigherThanTwoContainer';

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
  <Card title="Your goal is to keep all values green!">
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
        <PerformanceGoalsStudyQualityAverageContainer />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <PerformanceGoalsStudyQualityHigherThanFiveContainer />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <PerformanceGoalsActiveStudentsContainer />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <PerformanceGoalsStudyTimeHigherThanTwoContainer />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        {/* // TODO  fix to use values from school config */}
        <CircularProgress
          title={`Minimum ${2}hours last 7 days`}
          value={91}
          max={100}
          successCondition={value => value > 50}
          badCondition={value => value <= 35}
          valueRender={value => `${value}%`}
          legend={localStorage.role === 'TEACHER' && 'School average 80%'}
        />
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
  </Card>
);

export default PerformanceGoals;
