import React from 'react';
import { observer } from 'mobx-react';
import StudentListService from '../services/StudentListService';
import StudentListFilter from './StudentListFilter';

const StudentListFilterContainer = () => (
  <StudentListFilter
    values={StudentListService.form.getValues()}
    onChange={StudentListService.form.setValue}
    fetching={StudentListService.fetch.fetching}
    onSearch={StudentListService.load}
  />
);

export default observer(StudentListFilterContainer);
