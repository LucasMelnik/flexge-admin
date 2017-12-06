import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudyQualityGroupChart from './StudyQualityGroupChart';
import StudyQualityDashboardService from '../../services/StudyQualityDashboardService';

class StudyQualityGroupChartContainer extends Component {

  getData = () => {
    if (StudyQualityDashboardService.loadingStudyQualityGroups) {
      return [];
    }

    return Object.keys(StudyQualityDashboardService.schoolStudyQualityGroups).map((key) => {
      if (StudyQualityDashboardService.schoolStudyQualityGroups[key]) {
        return StudyQualityDashboardService.schoolStudyQualityGroups[key].reduce((schoolAcc, school) => {
          if (school.classes) {
            return schoolAcc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
          }
          return schoolAcc;
        }, 0);
      }
      return [];
    });
  };

  render() {
    return (
      <StudyQualityGroupChart
        data={this.getData()}
        loading={StudyQualityDashboardService.loadingStudyQualityGroups}
      />
    );
  }
}

export default observer(StudyQualityGroupChartContainer);

