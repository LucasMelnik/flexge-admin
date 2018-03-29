import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudentAchievementsListService from '../services/StudentAchievementsListService';
import StudentAchievementsListFilter from './StudentAchievementsListFilter';

class StudentAchievementsListFilterContainer extends Component {

  componentDidMount() {
    StudentAchievementsListService.init();
  }

  render() {
    return (
      <StudentAchievementsListFilter
        values={StudentAchievementsListService.form.getValues()}
        onChange={StudentAchievementsListService.form.setValue}
        errors={StudentAchievementsListService.form.errors}
        onSearch={StudentAchievementsListService.load}
        fetching={StudentAchievementsListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentAchievementsListFilterContainer);
