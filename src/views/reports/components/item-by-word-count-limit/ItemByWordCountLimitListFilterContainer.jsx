import React from 'react';
import { observer } from 'mobx-react';
import ItemByWordCountLimitListFilter from './ItemByWordCountLimitListFilter';
import ItemByWordCountLimitListService from '../../services/ItemByWordCountLimitListService';

const ItemByWordCountLimitListFilterContainer = () => (
  <ItemByWordCountLimitListFilter
    values={ItemByWordCountLimitListService.form.getValues()}
    onChange={ItemByWordCountLimitListService.form.setValue}
    onSubmit={ItemByWordCountLimitListService.load}
    fetching={ItemByWordCountLimitListService.fetch.fetching}
  />
);

export default observer(ItemByWordCountLimitListFilterContainer);
