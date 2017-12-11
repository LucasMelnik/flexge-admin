import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AverageEnglishLevelService from '../../services/AverageEnglishLevelService';
import SemiannualEnglishLevelProgressService from '../../services/SemiannualEnglishLevelProgressService';
import ActiveStudentsByPeriodService from '../../services/ActiveStudentsByPeriodService';
import LastWeekAverageStudiedTimeService from '../../services/LastWeekAverageStudiedTimeService';
import AverageStudyQualityService from '../../services/AverageStudyQualityService';
import StudyQualityGroupService from '../../services/StudyQualityGroupService';
import StudiedTimeGroupService from '../../services/StudiedTimeGroupService';
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
    AverageEnglishLevelService.load();
    SemiannualEnglishLevelProgressService.load();
  }

  render() {
    return (
      <SchoolManagerDashboard />
    );
  }
}

export default observer(SchoolManagerDashboardContainer);
