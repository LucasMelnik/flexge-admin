import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UsageStatsFilter from './UsageStatsFilter';
import UsageStatsFilterService from '../services/UsageStatsFilterService';
import UsageStatsListService from '../services/UsageStatsListService';

class UsageStatsFilterContainer extends Component {

  componentWillMount() {
    UsageStatsFilterService.init();
  }

  render() {
    return (
      <UsageStatsFilter
        values={UsageStatsFilterService.form.getValues()}
        onChange={UsageStatsFilterService.form.setValue}
        onSearch={UsageStatsFilterService.handleSearch}
        fetching={UsageStatsListService.fetch.fetching}
      />
    );
  }
}

export default observer(UsageStatsFilterContainer);
