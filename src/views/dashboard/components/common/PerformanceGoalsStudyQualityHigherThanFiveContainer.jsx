import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudyQualityGroupService from '../../services/StudyQualityGroupService';
import CircularProgress from '../../../../core/layout/CircularProgress';

class PerformanceGoalsStudyQualityHigherThanFiveContainer extends Component {

  componentWillMount() {
    StudyQualityGroupService.loadStudyQualityGroups();
  }

  render() {
    console.log('StudyQualityGroupService.higherThanFive', StudyQualityGroupService.higherThanFive)
    return (
      <CircularProgress
        fetching={StudyQualityGroupService.fetch.fetching}
        noDataText="No Study Quality found"
        title="Study Quality > 5"
        tooltip="Students with Study Quality higher than 5"
        value={StudyQualityGroupService.higherThanFive}
        max={100}
        successCondition={value => value > 50}
        badCondition={value => value <= 35}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && `School average ${StudyQualityGroupService.higherThanFiveSchoolAverage}%`}
      />
    );
  }
}

export default observer(PerformanceGoalsStudyQualityHigherThanFiveContainer);
