import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudiedTimeGroupService from '../../../services/StudiedTimeGroupService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

class StudyTimeHigherThanTwoContainer extends Component {

  componentWillMount() {
    StudiedTimeGroupService.loadStudyQualityGroups();
  }

  render() {
    const school = JSON.parse(localStorage.getItem('school'));
    return (
      <CircularProgress
        fetching={StudiedTimeGroupService.fetch.fetching}
        noDataText="No students found"
        title={`Minimum ${school.weeklyHoursRequired} hours last 7 days`}
        tooltip={`Students which studied more than ${school.weeklyHoursRequired} hours last 7 days`}
        value={StudiedTimeGroupService.higherThanTwo}
        max={100}
        successCondition={value => value > 50}
        badCondition={value => value <= 35}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && `School average ${StudiedTimeGroupService.higherThanTwoSchoolAverage}%`}
      />
    );
  }
}

export default observer(StudyTimeHigherThanTwoContainer);
