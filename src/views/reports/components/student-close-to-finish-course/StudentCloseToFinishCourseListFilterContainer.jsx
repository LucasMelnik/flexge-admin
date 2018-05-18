import React from 'react';
import { observer } from 'mobx-react';
import StudentCloseToFinishCourseListFilter from './StudentCloseToFinishCourseListFilter';
import StudentCloseToFinishCourseListService from '../../services/StudentCloseToFinishCourseListService';

const StudentCloseToFinishCourseListFilterContainer = () => (
  <StudentCloseToFinishCourseListFilter
    values={StudentCloseToFinishCourseListService.form.getValues()}
    onChange={StudentCloseToFinishCourseListService.form.setValue}
    onSubmit={StudentCloseToFinishCourseListService.load}
    fetching={StudentCloseToFinishCourseListService.fetch.fetching}
  />
);

export default observer(StudentCloseToFinishCourseListFilterContainer);
