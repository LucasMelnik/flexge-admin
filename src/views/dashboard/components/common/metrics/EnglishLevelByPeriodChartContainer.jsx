import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EnglishLevelService from '../../../services/EnglishLevelService';
import EnglishLevelByPeriodChart from './EnglishLevelByPeriodChart';

class EnglishLevelByPeriodChartContainer extends Component {
  componentWillMount() {
    EnglishLevelService.load();
  }

  render() {
    return (
      <EnglishLevelByPeriodChart
        data={EnglishLevelService.englishLevelProgress}
        loading={EnglishLevelService.fetch.fetching}
      />
    );
  }
}

export default observer(EnglishLevelByPeriodChartContainer);
