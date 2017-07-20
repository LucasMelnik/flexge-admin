import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ModuleItemListService from '../services/ModuleItemListService';
import ModuleItemListFilter from './ModuleItemListFilter';

const ModuleItemListFilterContainer = props => (
  <ModuleItemListFilter
    onSearch={ModuleItemListService.load}
    itemTypesUrl={props.itemTypesUrl}
    onChange={ModuleItemListService.form.setValue}
    values={ModuleItemListService.form.getValues()}
    fetching={ModuleItemListService.fetch.fetching}
  />
);

ModuleItemListFilterContainer.propTypes = {
  itemTypesUrl: PropTypes.string.isRequired,
};

export default observer(ModuleItemListFilterContainer);
