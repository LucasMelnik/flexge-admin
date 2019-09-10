import React from 'react';
import { observer } from 'mobx-react';
import CourseStudentCountListFilter from './CourseStudentCountListFilter';
import CourseStudentCountListService from '../../services/CourseStudentCountListService';

const CourseStudentCountListFilterContainer = () => (
  <CourseStudentCountListFilter
    values={CourseStudentCountListService.form.getValues()}
    onChange={CourseStudentCountListService.form.setValue}
    onSubmit={CourseStudentCountListService.load}
    fetching={CourseStudentCountListService.fetch.fetching}
  />
);

export default observer(CourseStudentCountListFilterContainer);
