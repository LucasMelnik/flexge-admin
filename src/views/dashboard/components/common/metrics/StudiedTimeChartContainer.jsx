import React from 'react';
import { observer } from 'mobx-react';
import StudiedTimeChart from './StudiedTimeChart';
import StudiedTimeGroupService from '../../../services/StudiedTimeGroupService';

const StudiedTimeChartContainer = (props) => (
  <StudiedTimeChart
    query={props.query}
    data={StudiedTimeGroupService.totalByGroup}
    loading={StudiedTimeGroupService.fetch.fetching}
  />
);

export default observer(StudiedTimeChartContainer);
