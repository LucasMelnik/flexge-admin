import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudentStudiedTimeChart from './StudentStudiedTimeChart';
import StudiedTimeGroupService from '../../../services/StudiedTimeGroupService';

class StudentStudiedTimeChartContainer extends Component {
  render() {
    return (
      <StudentStudiedTimeChart
        data={StudiedTimeGroupService.totalByGroup}
        loading={StudiedTimeGroupService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentStudiedTimeChartContainer);
