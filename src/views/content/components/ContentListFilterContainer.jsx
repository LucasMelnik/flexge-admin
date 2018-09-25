import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ContentListFilter from './ContentListFilter';
import ContentListService from '../services/ContentListService';

const ContentListFilterContainer = () => (
  <ContentListFilter
    values={ContentListService.form.getValues()}
    errors={ContentListService.form.submitted && ContentListService.form.errors}
    onChange={ContentListService.form.setValue}
    onSearch={ContentListService.load}
    fetching={ContentListService.fetch.fetching}
    onModuleSearch={ContentListService.loadModules}
    fetchingModules={ContentListService.fetchModules.fetching}
    modules={toJS(ContentListService.modules)}
    onUnitSearch={ContentListService.loadUnits}
    fetchingUnits={ContentListService.fetchUnits.fetching}
    units={toJS(ContentListService.units)}
  />
);

export default observer(ContentListFilterContainer);
