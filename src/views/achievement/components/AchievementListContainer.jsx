import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AchievementList from './AchievementList';
import AchievementListService from '../services/AchievementListService';

class AchievementListContainer extends Component {

  componentDidMount() {
    AchievementListService.init();
  }

  render() {
    return (
      <AchievementList
        achievements={toJS(AchievementListService.achievements)}
        fetching={AchievementListService.fetch.fetching}
        onDelete={AchievementListService.handleRemove}
      />
    );
  }
}

export default observer(AchievementListContainer);
