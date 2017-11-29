import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DifficultyLevelAmountsList from './DifficultyLevelAmountsList';
import DifficultyLevelAmountsListService from '../../services/admin/DifficultyLevelAmountsListService';

class DifficultyLevelAmountsListContainer extends Component {

  componentWillMount() {
    DifficultyLevelAmountsListService.load();
  }

  render() {
    return (
      <DifficultyLevelAmountsList
        amounts={toJS(DifficultyLevelAmountsListService.difficultyAmounts)}
        fetching={DifficultyLevelAmountsListService.fetch.fetching}
      />
    );
  }
}

export default observer(DifficultyLevelAmountsListContainer);
