import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import SemiannualEnglishLevelProgressService from '../../../services/SemiannualEnglishLevelProgressService';
import SemiannualEnglishLevelProgressChart from './SemiannualEnglishLevelProgressChart';

class SemiannualEnglishLevelProgressChartContainer extends Component {
  componentDidMount() {
    SemiannualEnglishLevelProgressService.load();
  }

  render() {
    return (
      <SemiannualEnglishLevelProgressChart
        data={SemiannualEnglishLevelProgressService.englishLevelProgress}
        loading={SemiannualEnglishLevelProgressService.fetch.fetching}
      />
    );
  }
}

export default observer(SemiannualEnglishLevelProgressChartContainer);
