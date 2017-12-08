import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudyQualityGroupChart from './StudyQualityGroupChart';
import StudyQualityGroupService from '../../services/StudyQualityGroupService';

class StudyQualityGroupChartContainer extends Component {

  getData = () => {
    if (StudyQualityGroupService.fetch.fetching) {
      return [];
    }

    return Object.keys(StudyQualityGroupService.studyQualityGroups).map((key) => {
      if (StudyQualityGroupService.studyQualityGroups[key]) {
        return StudyQualityGroupService.studyQualityGroups[key].reduce((schoolAcc, school) => {
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
        loading={StudyQualityGroupService.fetch.fetching}
      />
    );
  }
}

export default observer(StudyQualityGroupChartContainer);
