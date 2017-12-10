import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudiedTimeChart from './StudiedTimeChart';
import StudiedTimeGroupService from '../../../services/StudiedTimeGroupService';

class StudiedTimeChartContainer extends Component {
  render() {
    return (
      <StudiedTimeChart
        data={StudiedTimeGroupService.totalByGroup}
        loading={StudiedTimeGroupService.fetch.fetching}
      />
    );
  }
}

export default observer(StudiedTimeChartContainer);
