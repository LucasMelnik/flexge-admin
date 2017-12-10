import React from 'react';
import { observer } from 'mobx-react';
import StudyQualityGroupChart from './StudyQualityGroupChart';
import StudyQualityGroupService from '../../../services/StudyQualityGroupService';

const StudyQualityGroupChartContainer = () => (
  <StudyQualityGroupChart
    data={StudyQualityGroupService.rates}
    loading={StudyQualityGroupService.fetch.fetching}
  />
);

export default observer(StudyQualityGroupChartContainer);
