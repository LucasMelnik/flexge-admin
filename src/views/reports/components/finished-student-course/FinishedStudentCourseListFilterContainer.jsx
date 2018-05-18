import React from 'react';
import { observer } from 'mobx-react';
import FinishedStudentCourseListFilter from './FinishedStudentCourseListFilter';
import FinishedStudentCourseListService from '../../services/FinishedStudentCourseListService';

const FinishedStudentCourseListFilterContainer = () => (
  <FinishedStudentCourseListFilter
    values={FinishedStudentCourseListService.form.getValues()}
    onChange={FinishedStudentCourseListService.form.setValue}
    onSubmit={FinishedStudentCourseListService.load}
    fetching={FinishedStudentCourseListService.fetch.fetching}
  />
);

export default observer(FinishedStudentCourseListFilterContainer);
