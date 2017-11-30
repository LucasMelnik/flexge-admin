import React from 'react';
import { observer } from 'mobx-react';
import Average from './Average';
import ScoreToPassAmountsListService from '../../services/admin/ScoreToPassAmountsListService';

const ScoreToPassAverageContainer = () => (
  <Average
    average={ScoreToPassAmountsListService.average}
    from={78}
    to={82}
  />
);

export default observer(ScoreToPassAverageContainer);