import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AverageEnglishLevelService from '../../../services/AverageEnglishLevelService';
import EnglishLevelByPeriodChart from './EnglishLevelByPeriodChart';

class EnglishLevelByPeriodChartContainer extends Component {
  componentWillMount() {
    AverageEnglishLevelService.load();
  }

  render() {
    return (
      <EnglishLevelByPeriodChart
        data={AverageEnglishLevelService.englishLevelProgress}
        loading={AverageEnglishLevelService.fetch.fetching}
      />
    );
  }
}

export default observer(EnglishLevelByPeriodChartContainer);
