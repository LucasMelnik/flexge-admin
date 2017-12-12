import React from 'react';
import { observer } from 'mobx-react';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

const PerformanceGoalsStudyQualityAverageContainer = () => {
  const average = localStorage.getItem('COMPANY_MANAGER') ?
    AverageStudyQualityService.allSchoolsAverage :
    AverageStudyQualityService.averageByClass;
  return (
    <CircularProgress
      fetching={AverageStudyQualityService.fetch.fetching}
      noDataText="No Study Quality found"
      title="Study Quality"
      tooltip="Your classes Study Quality average"
      value={Number(average.toFixed(1)) + 5}
      max={20}
      valueRender={value => Number(value.toFixed(1)) - 5}
      successCondition={value => value > 10}
      badCondition={value => value < 5}
      legend={localStorage.role === 'TEACHER' && `School average ${AverageStudyQualityService.allSchoolsAverage.toFixed(1)}`}
    />
  );
};

export default observer(PerformanceGoalsStudyQualityAverageContainer);
