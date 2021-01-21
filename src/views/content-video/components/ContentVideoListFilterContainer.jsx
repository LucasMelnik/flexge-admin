import React from 'react';
import { observer } from 'mobx-react';
import ContentVideoListService from '../services/ContentVideoListService';
import ContentVideoListFilter from './ContentVideoListFilter';

const ContentVideoListFilterContainer = () => (
  <ContentVideoListFilter
    onSubmit={ContentVideoListService.load}
    onChange={ContentVideoListService.form.setValue}
    values={ContentVideoListService.form.getValues()}
    fetching={ContentVideoListService.fetch.fetching}
  />
);

export default observer(ContentVideoListFilterContainer);
