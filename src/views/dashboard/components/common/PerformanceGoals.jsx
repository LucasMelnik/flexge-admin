import React from 'react';
import CircularProgress from '../../../../core/layout/CircularProgress';
import Card from '../../../../core/layout/Card';
import PerformanceGoalsStudyQualityAverageContainer from './PerformanceGoalsStudyQualityAverageContainer';
import PerformanceGoalsStudyQualityHigherThanFiveContainer from './PerformanceGoalsStudyQualityHigherThanFiveContainer';

const PerformanceGoals = () => (
  <Card title="Your goal is to keep all values green!">
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <PerformanceGoalsStudyQualityAverageContainer />
      <PerformanceGoalsStudyQualityHigherThanFiveContainer />
      <CircularProgress
        title="Active Students"
        tooltip="Students which studied at least once on last 30 days"
        value={74}
        max={100}
        successCondition={value => value > 85}
        badCondition={value => value <= 65}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && 'School average 55%'}
      />
      <CircularProgress
        title="Active Students last 7 days"
        value={63}
        max={100}
        successCondition={value => value > 85}
        badCondition={value => value <= 65}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && 'School average 60%'}
      />
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
    </div>
  </Card>
);

export default PerformanceGoals;
