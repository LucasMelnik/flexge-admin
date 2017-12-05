import React from 'react';
import CircularProgress from '../../../../core/layout/CircularProgress';

const PerformanceGoals = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    <CircularProgress
      title="Study Quality"
      tooltip="Your classes average"
      value={20}
      max={20}
      valueRender={value => value - 5}
      successCondition={value => value > 10}
      badCondition={value => value < 5}
      legend="School average 12.7"
    />
    <CircularProgress
      title="Study Quality > 5"
      tooltip="Students with Study Quality higher than 5"
      value={50}
      max={100}
      successCondition={value => value > 50}
      badCondition={value => value <= 35}
      valueRender={value => `${value}%`}
      legend="School average 32%"
    />
    <CircularProgress
      title="Active Students"
      tooltip="Students which studied at least once on last 30 days"
      value={74}
      max={100}
      successCondition={value => value > 85}
      badCondition={value => value <= 65}
      valueRender={value => `${value}%`}
      legend="School average 55%"
    />
    <CircularProgress
      title="Active Students last 7 days"
      value={63}
      max={100}
      successCondition={value => value > 85}
      badCondition={value => value <= 65}
      valueRender={value => `${value}%`}
      legend="School average 60%"
    />
    {/* // TODO  fix to use values from school config */}
    <CircularProgress
      title={`Minimum ${2}hours last 7 days`}
      value={91}
      max={100}
      successCondition={value => value > 50}
      badCondition={value => value <= 35}
      valueRender={value => `${value}%`}
      legend="School average 80%"
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
      legend="School average 01:13"
    />
  </div>
);

export default PerformanceGoals;
