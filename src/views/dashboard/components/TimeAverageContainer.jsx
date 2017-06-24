import React from 'react';
import { observer } from 'mobx-react';
import Average from './Average';
import TimeAmountsListService from '../services/TimeAmountsListService';

const TimeAverageContainer = () => (
  <Average
    average={TimeAmountsListService.average}
    from={3.80}
    to={4.20}
  />
);

export default observer(TimeAverageContainer);