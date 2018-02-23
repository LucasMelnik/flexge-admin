import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UsageStatsList from './UsageStatsList';
import UsageStatsListService from '../services/UsageStatsListService';

class UsageStatsListContainer extends Component {

  componentDidMount() {
    UsageStatsListService.init();
  }

  render() {
    return (
      <UsageStatsList
        schools={toJS(UsageStatsListService.schools)}
        fetching={UsageStatsListService.fetch.fetching}
      />
    );
  }
}

export default observer(UsageStatsListContainer);
