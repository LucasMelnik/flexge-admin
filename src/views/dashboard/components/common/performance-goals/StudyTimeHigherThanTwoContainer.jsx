import React from 'react';
import { observer } from 'mobx-react';
import StudiedTimeGroupService from '../../../services/StudiedTimeGroupService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

const StudyTimeHigherThanTwoContainer = () => {
  const school = JSON.parse(localStorage.getItem('school'));
  return (
    <CircularProgress
      fetching={StudiedTimeGroupService.fetch.fetching}
      noDataText="No students found"
      title={`${school ? school.weeklyHoursRequired : 2} hours last 7 days`}
      tooltip={`Students which studied at least ${school ? school.weeklyHoursRequired : 2} hours last 7 days`}
      value={Number(StudiedTimeGroupService.higherThanTwo.toFixed(0))}
      max={100}
      successCondition={value => value > 50}
      badCondition={value => value <= 35}
      valueRender={value => `${value}%`}
      legend={localStorage.role === 'TEACHER' && `School average ${StudiedTimeGroupService.higherThanTwoSchoolAverage}%`}
    />
  );
};

export default observer(StudyTimeHigherThanTwoContainer);
