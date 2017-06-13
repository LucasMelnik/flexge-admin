import React from 'react';
import { observer } from 'mobx-react';
import TeacherListService from '../services/TeacherListService';
import TeacherListFilter from './TeacherListFilter';

const TeacherListFilterContainer = () => (
  <TeacherListFilter
    values={TeacherListService.form.getValues()}
    onChange={TeacherListService.form.setValue}
    fetching={TeacherListService.fetch.fetching}
    onSearch={TeacherListService.load}
  />
);

export default observer(TeacherListFilterContainer);
