import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import StudyQualityChart from './StudyQualityChart';
import { Roles } from '../../../../../core/util';

class StudyQualityChartContainer extends Component {
  getTitle = () => {
    if (localStorage.role === Roles.TEACHER || localStorage.role === Roles.SCHOOL_MANAGER) {
      return 'Study Quality by Classes';
    }
    return 'Study Quality by Schools';
  };

  render() {
    const labels = [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER].some(role => role === localStorage.role) ?
      AverageStudyQualityService.data.map(school => school.name) :
      AverageStudyQualityService.data.reduce((acc, school) => ([
        ...acc,
        ...school.classes.map(schoolClass => schoolClass.className),
      ]), []);
    const values = [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER].some(role => role === localStorage.role) ?
      AverageStudyQualityService.data.map(school => Number(school.schoolAverageScore.toFixed(1))) :
      AverageStudyQualityService.data.reduce((acc, school) => ([
        ...acc,
        ...school.classes.map(schoolClass => Number(schoolClass.classAverageScore.toFixed(1))),
      ]), []);
    return (
      <StudyQualityChart
        title={this.getTitle()}
        labels={labels}
        values={values}
        loading={AverageStudyQualityService.fetch.fetching}
      />
    );
  }
}

export default observer(StudyQualityChartContainer);
