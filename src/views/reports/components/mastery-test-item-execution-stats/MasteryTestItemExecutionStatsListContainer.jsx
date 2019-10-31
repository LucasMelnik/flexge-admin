import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MasteryTestItemExecutionStatsList from './MasteryTestItemExecutionStatsList';
import MasteryTestItemExecutionStatsListService from '../../services/MasteryTestItemExecutionStatsListService';

class MasteryTestItemExecutionStatsListContainer extends Component {

  componentDidMount() {
    MasteryTestItemExecutionStatsListService.init();
  }

  render() {
    return (
      <MasteryTestItemExecutionStatsList
        items={toJS(MasteryTestItemExecutionStatsListService.items)}
        fetching={MasteryTestItemExecutionStatsListService.fetch.fetching}
      />
    );
  }
}

export default observer(MasteryTestItemExecutionStatsListContainer);
