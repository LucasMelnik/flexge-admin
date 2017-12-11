import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import SemiannualEnglishLevelProgressService from '../../../services/SemiannualEnglishLevelProgressService';
import SemiannualAverageProgress from './SemiannualAverageProgress';

class SemiannualAverageProgressContainer extends Component {
  componentDidMount() {
    SemiannualEnglishLevelProgressService.load();
  }

  render() {
    return (
      <SemiannualAverageProgress
        progress={SemiannualEnglishLevelProgressService.average.toFixed(2)}
        loading={SemiannualEnglishLevelProgressService.fetch.fetching}
      />
    );
  }
}

export default observer(SemiannualAverageProgressContainer);
