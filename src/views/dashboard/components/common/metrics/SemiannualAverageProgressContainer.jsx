import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import SemiannualAverageEnglishLevelProgressService from '../../../services/SemiannualAverageEnglishLevelProgressService';
import SemiannualAverageProgress from './SemiannualAverageProgress';

class SemiannualAverageProgressContainer extends Component {
  componentDidMount() {
    SemiannualAverageEnglishLevelProgressService.load();
  }

  render() {
    return (
      <SemiannualAverageProgress
        progress={
            SemiannualAverageEnglishLevelProgressService.data ?
          SemiannualAverageEnglishLevelProgressService.data.toFixed(1) : null
        }
        loading={SemiannualAverageEnglishLevelProgressService.fetch.fetching}
      />
    );
  }
}

export default observer(SemiannualAverageProgressContainer);
