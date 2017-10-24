import React from 'react';
import { observer } from 'mobx-react';
import CharacterListService from '../services/CharacterListService';
import CharacterListFilter from './CharacterListFilter';

const CharacterListFilterContainer = () => (
  <CharacterListFilter
    value={CharacterListService.filter}
    onChange={CharacterListService.handleFilterChange}
  />
);

export default observer(CharacterListFilterContainer);
