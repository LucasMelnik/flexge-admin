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
        errors={UsageStatsFilterService.form.errors}
        onFilterTypeChange={UsageStatsFilterService.handleChangeType}
        filterType={UsageStatsFilterService.filterType}
        onChange={UsageStatsFilterService.form.setValue}
        onSearch={UsageStatsFilterService.handleSearch}
        onExport={UsageStatsFilterService.handleExport}
        fetching={UsageStatsListService.fetch.fetching}
        downloading={UsageStatsFilterService.download.fetching}
      />
    );
  }
}

export default observer(UsageStatsFilterContainer);
