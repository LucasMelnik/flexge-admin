import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ContentListFilter from './ContentListFilter';
import ContentListService from '../services/ContentListService';

const ContentListFilterContainer = () => (
  <ContentListFilter
    values={ContentListService.form.getValues()}
    onChange={ContentListService.form.setValue}
    onSearch={ContentListService.load}
    fetching={ContentListService.fetch.fetching}
    onModuleSearch={ContentListService.loadModules}
    modules={toJS(ContentListService.modules)}
    onUnitSearch={ContentListService.loadUnits}
    units={toJS(ContentListService.units)}
  />
);

export default observer(ContentListFilterContainer);
