import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

class PerformanceGoalsStudyQualityAverageContainer extends Component {
  componentWillMount() {
    AverageStudyQualityService.loadStudyQualityScores();
  }

  render() {
    const average = localStorage.getItem('COMPANY_MANAGER') ?
      AverageStudyQualityService.allSchoolsAverage :
      AverageStudyQualityService.averageByClass;
    return (
      <CircularProgress
        fetching={AverageStudyQualityService.fetch.fetching}
        noDataText="No Study Quality found"
        title="Study Quality"
        tooltip="Your classes average"
        value={average + 5}
        max={20}
        valueRender={value => value - 5}
        successCondition={value => value > 10}
        badCondition={value => value < 5}
        legend={localStorage.role === 'TEACHER' && `School average ${AverageStudyQualityService.allSchoolsAverage}`}
      />
    );
  }
}

export default observer(PerformanceGoalsStudyQualityAverageContainer);
