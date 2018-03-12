import React from 'react';
import { observer } from 'mobx-react';
import StudentAchievementsListService from '../services/StudentAchievementsListService';
import StudentAchievementsListFilter from './StudentAchievementsListFilter';

const StudentAchievementsListFilterContainer = () => (
  <StudentAchievementsListFilter
    values={StudentAchievementsListService.form.getValues()}
    onChange={StudentAchievementsListService.form.setValue}
    errors={StudentAchievementsListService.form.errors}
    onSearch={StudentAchievementsListService.load}
    fetching={StudentAchievementsListService.fetch.fetching}
  />
);

export default observer(StudentAchievementsListFilterContainer);
