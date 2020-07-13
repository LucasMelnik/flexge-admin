import React from 'react';
import { observer } from 'mobx-react';
import LocalizationListService from '../services/LocalizationListService';
import LocalizationListFilter from './LocalizationListFilter';

const LocalizationListFilterContainer = () => (
  <LocalizationListFilter
    values={LocalizationListService.form.getValues()}
    onChange={LocalizationListService.form.setValue}
    fetching={LocalizationListService.fetch.fetching}
    onSearch={LocalizationListService.load}
  />
);

export default observer(LocalizationListFilterContainer);
