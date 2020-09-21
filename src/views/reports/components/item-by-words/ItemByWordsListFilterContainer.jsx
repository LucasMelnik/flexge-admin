import React from 'react';
import { observer } from 'mobx-react';
import ItemByWordsListFilter from './ItemByWordsListFilter';
import ItemByWordsListService from '../../services/ItemByWordsListService';

const ItemByWordsListFilterContainer = () => (
  <ItemByWordsListFilter
    values={ItemByWordsListService.form.getValues()}
    onChange={ItemByWordsListService.form.setValue}
    onSubmit={ItemByWordsListService.load}
    fetching={ItemByWordsListService.fetch.fetching}
    errors={ItemByWordsListService.form.errors}
  />
);

export default observer(ItemByWordsListFilterContainer);
