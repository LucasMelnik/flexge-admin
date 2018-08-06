import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import SemiannualAverageEnglishLevelService from '../../services/SemiannualAverageEnglishLevelService';
import SemiannualEnglishLevelProgressService from '../../services/SemiannualEnglishLevelProgressService';
import ActiveStudentsByPeriodService from '../../services/ActiveStudentsByPeriodService';
import LastWeekAverageStudiedTimeService from '../../services/LastWeekAverageStudiedTimeService';
import AverageStudyQualityService from '../../services/AverageStudyQualityService';
import StudyQualityGroupService from '../../services/StudyQualityGroupService';
import StudiedTimeGroupService from '../../services/StudiedTimeGroupService';
import HistoryListFilterService from '../../services/HistoryListFilterService';
import WeekStatsByPeriodService from '../../services/WeekStatsByPeriodService';
import AverageStudyQualityByPeriodService from '../../services/AverageStudyQualityByPeriodService';
import SchoolManagerDashboard from './SchoolManagerDashboard';

class SchoolManagerDashboardContainer extends Component {
  componentWillMount() {
    // Performance Goals
    ActiveStudentsByPeriodService.load();
    LastWeekAverageStudiedTimeService.load();
    AverageStudyQualityService.load();
    StudyQualityGroupService.load();
    StudiedTimeGroupService.load();
    // Metrics
    SemiannualAverageEnglishLevelService.load();
    SemiannualEnglishLevelProgressService.load();
    // HistoryListFilter
    WeekStatsByPeriodService.load(
      moment().year(HistoryListFilterService.year).startOf('year').format('YYYY-MM-DD'),
      moment().year(HistoryListFilterService.year).endOf('year').format('YYYY-MM-DD'),
    );
    AverageStudyQualityByPeriodService.load(
      moment().year(HistoryListFilterService.year).startOf('year').format('YYYY-MM-DD'),
      moment().year(HistoryListFilterService.year).endOf('year').format('YYYY-MM-DD'),
    );
  }

  render() {
    return (
      <SchoolManagerDashboard />
    );
  }
}

export default observer(SchoolManagerDashboardContainer);
