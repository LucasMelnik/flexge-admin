import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import SemiannualAverageEnglishLevelService from '../../services/SemiannualAverageEnglishLevelService';
import SemiannualEnglishLevelProgressService from '../../services/SemiannualEnglishLevelProgressService';
import ActiveStudentsByPeriodService from '../../services/ActiveStudentsByPeriodService';
import AverageStudyQualityService from '../../services/AverageStudyQualityService';
import StudyQualityGroupService from '../../services/StudyQualityGroupService';
import StudiedTimeGroupService from '../../services/StudiedTimeGroupService';
import HistoryListFilterService from '../../services/HistoryListFilterService';
import WeekStatsByPeriodService from '../../services/WeekStatsByPeriodService';
import AverageStudyQualityByPeriodService from '../../services/AverageStudyQualityByPeriodService';
import Card from '../../../../core/layout/Card';
import PerformanceGoals from '../common/performance-goals/PerformanceGoals';
import Separator from '../../../../core/layout/Separator';
import MetricCharts from './MetricCharts';
import HistoryCharts from './HistoryCharts';
import DistributorManagerDashboardFilterService from '../../services/DistributorManagerDashboardFilterService';

class DistributorManagerDataContainer extends Component {
  componentDidMount() {
    DistributorManagerDashboardFilterService.init();
  }

  componentDidUpdate() {
    if (!DistributorManagerDashboardFilterService.form.getValue('company')) {
      return null;
    }

    const filterQuery = DistributorManagerDashboardFilterService.form.getValues();
    // Performance Goals
    ActiveStudentsByPeriodService.load(filterQuery);
    // LastWeekAverageStudiedTimeService.load();
    AverageStudyQualityService.load(filterQuery);
    StudyQualityGroupService.load(filterQuery);
    StudiedTimeGroupService.load(filterQuery);
    // Metrics
    SemiannualAverageEnglishLevelService.load(filterQuery);
    SemiannualEnglishLevelProgressService.load(filterQuery);
    // // HistoryListFilter
    WeekStatsByPeriodService.load(
      moment().year(toJS(HistoryListFilterService.year)).startOf('year').format('YYYY-MM-DD'),
      moment().year(toJS(HistoryListFilterService.year)).endOf('year').format('YYYY-MM-DD'),
      filterQuery
    );
    AverageStudyQualityByPeriodService.load(
      moment().year(toJS(HistoryListFilterService.year)).startOf('year').format('YYYY-MM-DD'),
      moment().year(toJS(HistoryListFilterService.year)).endOf('year').format('YYYY-MM-DD'),
      filterQuery
    );
  }

  render() {
    if (!DistributorManagerDashboardFilterService.form.getValue('company')) {
      return null;
    }
    return (
      <div key={DistributorManagerDashboardFilterService.form.getValue('company') || 'none'}>
        <div id="performance-goals-card" style={{ marginLeft: -30, marginRight: -30, marginTop: -10 }}>
          <Card title="Performance Goals">
            <PerformanceGoals
              query={DistributorManagerDashboardFilterService.form.getValues()}
            />
          </Card>
        </div>
        <Separator />
        <MetricCharts
          query={DistributorManagerDashboardFilterService.form.getValues()}
        />
        <Separator />
        <HistoryCharts />
      </div>
    );
  }
}

export default observer(DistributorManagerDataContainer);
