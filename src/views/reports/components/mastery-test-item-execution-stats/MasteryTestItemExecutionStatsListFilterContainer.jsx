import React from 'react';
import { observer } from 'mobx-react';
import MasteryTestItemExecutionStatsListFilter from './MasteryTestItemExecutionStatsListFilter';
import MasteryTestItemExecutionStatsListService from '../../services/MasteryTestItemExecutionStatsListService';

const MasteryTestItemExecutionStatsListFilterContainer = () => (
  <MasteryTestItemExecutionStatsListFilter
    values={MasteryTestItemExecutionStatsListService.form.getValues()}
    onChange={MasteryTestItemExecutionStatsListService.form.setValue}
    onSearch={MasteryTestItemExecutionStatsListService.load}
    fetching={MasteryTestItemExecutionStatsListService.fetch.fetching}
  />
);

export default observer(MasteryTestItemExecutionStatsListFilterContainer);
