import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentAchievementsList from './StudentAchievementsList';
import StudentAchievementsListService from '../services/StudentAchievementsListService';

class StudentAchievementsListContainer extends Component {

  componentDidMount() {
    StudentAchievementsListService.init();
  }

  render() {
    return (
      <StudentAchievementsList
        achievements={toJS(StudentAchievementsListService.achievements)}
        fetching={StudentAchievementsListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentAchievementsListContainer);
