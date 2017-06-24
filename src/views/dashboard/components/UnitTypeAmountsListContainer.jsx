import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import UnitTypeAmountsList from './UnitTypeAmountsList';
import UnitTypeAmountsListService from '../services/UnitTypeAmountsListService';

class UnitTypeAmountsListContainer extends Component {

  componentWillMount() {
    UnitTypeAmountsListService.load();
  }

  render() {
    return (
      <UnitTypeAmountsList
        amounts={toJS(UnitTypeAmountsListService.unitTypesAmounts)}
        fetching={UnitTypeAmountsListService.fetch.fetching}
      />
    )
  }
}

export default observer(UnitTypeAmountsListContainer);