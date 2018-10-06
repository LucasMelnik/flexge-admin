import React from 'react';
import { observer } from 'mobx-react';
import CountryListService from '../services/CountryListService';
import CountryListFilter from './CountryListFilter';

const CountryListFilterContainer = () => (
  <CountryListFilter
    value={CountryListService.filter}
    onChange={CountryListService.handleFilterChange}
  />
);

export default observer(CountryListFilterContainer);
