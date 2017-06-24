import React from 'react';
import { observer } from 'mobx-react';
import Average from './Average';
import DifficultyLevelAmountsListService from '../services/DifficultyLevelAmountsListService';

const DifficultyLevelAverageContainer = () => (
  <Average
    average={DifficultyLevelAmountsListService.average}
    from={1.94}
    to={2.06}
  />
);

export default observer(DifficultyLevelAverageContainer);