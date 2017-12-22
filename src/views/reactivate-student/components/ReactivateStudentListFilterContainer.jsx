import React from 'react';
import { observer } from 'mobx-react';
import ReactivateStudentListFilter from './ReactivateStudentListFilter';
import ReactivateStudentListService from '../services/ReactivateStudentListService';

const ReactivateStudentListFilterContainer = () => (
  <ReactivateStudentListFilter
    values={ReactivateStudentListService.form.getValues()}
    onChange={ReactivateStudentListService.form.setValue}
    onSearch={ReactivateStudentListService.load}
    fetching={ReactivateStudentListService.fetch.fetching}
  />
);

export default observer(ReactivateStudentListFilterContainer);
