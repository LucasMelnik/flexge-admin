import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ScoreToPassAmountsList from './ScoreToPassAmountsList';
import ScoreToPassAmountsListService from '../../services/admin/ScoreToPassAmountsListService';

class ScoreToPassAmountsListContainer extends Component {

  componentWillMount() {
    ScoreToPassAmountsListService.load();
  }

  render() {
    return (
      <ScoreToPassAmountsList
        amounts={toJS(ScoreToPassAmountsListService.scoreToPassAmounts)}
        fetching={ScoreToPassAmountsListService.fetch.fetching}
      />
    );
  }
}

export default observer(ScoreToPassAmountsListContainer);