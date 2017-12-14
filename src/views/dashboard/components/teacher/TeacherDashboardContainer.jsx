import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import AverageEnglishLevelService from '../../services/AverageEnglishLevelService';
import SemiannualEnglishLevelProgressService from '../../services/SemiannualEnglishLevelProgressService';
import ActiveStudentsByPeriodService from '../../services/ActiveStudentsByPeriodService';
import LastWeekAverageStudiedTimeService from '../../services/LastWeekAverageStudiedTimeService';
import AverageStudyQualityService from '../../services/AverageStudyQualityService';
import StudyQualityGroupService from '../../services/StudyQualityGroupService';
import StudiedTimeGroupService from '../../services/StudiedTimeGroupService';
import WeekStatsByPeriodService from '../../services/WeekStatsByPeriodService';
import HistoryListFilterService from '../../services/HistoryListFilterService';
import AverageStudyQualityByPeriodService from '../../services/AverageStudyQualityByPeriodService';
import TeacherDashboard from './TeacherDashboard';

class TeacherDashboardContainer extends Component {
  componentWillMount() {
    // Performance Goals
    ActiveStudentsByPeriodService.load();
    LastWeekAverageStudiedTimeService.load();
    AverageStudyQualityService.load();
    StudyQualityGroupService.load();
    StudiedTimeGroupService.load();
    // Metrics
    AverageEnglishLevelService.load();
    SemiannualEnglishLevelProgressService.load();
    // HistoryListFilter
    WeekStatsByPeriodService.load(
      moment().year(HistoryListFilterService.year).startOf('year').toDate(),
      moment().year(HistoryListFilterService.year).endOf('year').toDate(),
    );
    AverageStudyQualityByPeriodService.load(
      moment().year(HistoryListFilterService.year).startOf('year').toDate(),
      moment().year(HistoryListFilterService.year).endOf('year').toDate(),
    );
  }

  render() {
    return (
      <TeacherDashboard />
    );
  }
}

export default observer(TeacherDashboardContainer);