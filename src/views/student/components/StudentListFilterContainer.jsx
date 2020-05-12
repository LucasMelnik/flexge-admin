import React from 'react';
import { observer } from 'mobx-react';
import StudentListService from '../services/StudentListService';
import StudentListFilter from './StudentListFilter';

const StudentListFilterContainer = (props) => (
  <StudentListFilter
    values={StudentListService.form.getValues()}
    onChange={StudentListService.form.setValue}
    onSearch={StudentListService.load}
    fetching={StudentListService.fetch.fetching}
    allowedFilters={props.allowedFilters}
  />
);

export default observer(StudentListFilterContainer);
