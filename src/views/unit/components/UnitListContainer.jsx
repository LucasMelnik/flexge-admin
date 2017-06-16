import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitList from './UnitList';
import UnitListService from '../services/UnitListService';

class UnitListContainer extends Component {

  componentDidMount() {
    UnitListService.init();
  }

  render() {
    return (
      <UnitList
        units={toJS(UnitListService.units)}
        fetching={UnitListService.fetch.fetching}
        onDelete={UnitListService.handleRemove}
      />
    );
  }
}

export default observer(UnitListContainer);
