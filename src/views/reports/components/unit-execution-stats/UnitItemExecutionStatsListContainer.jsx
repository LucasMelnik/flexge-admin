import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemExecutionStatsList from './UnitItemExecutionStatsList';
import UnitItemExecutionStatsListService from '../../services/UnitItemExecutionStatsListService';

class UnitItemExecutionStatsListContainer extends Component {

  componentDidMount() {
    UnitItemExecutionStatsListService.init();
  }

  render() {
    return (
      <UnitItemExecutionStatsList
        items={toJS(UnitItemExecutionStatsListService.items)}
        fetching={UnitItemExecutionStatsListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemExecutionStatsListContainer);
