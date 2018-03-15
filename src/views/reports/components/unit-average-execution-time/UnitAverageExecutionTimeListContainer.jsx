import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitAverageExecutionTimeList from './UnitAverageExecutionTimeList';
import UnitAverageExecutionTimeListService from '../../services/UnitAverageExecutionTimeListService';

class UnitAverageExecutionTimeListContainer extends Component {

  componentDidMount() {
    UnitAverageExecutionTimeListService.init();
  }

  render() {
    return (
      <UnitAverageExecutionTimeList
        units={toJS(UnitAverageExecutionTimeListService.units)}
        fetching={UnitAverageExecutionTimeListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitAverageExecutionTimeListContainer);
