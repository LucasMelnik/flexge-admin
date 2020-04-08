import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitTypeList from './UnitTypeList';
import UnitTypeListService from '../services/UnitTypeListService';

class UnitTypeListContainer extends Component {

  componentDidMount() {
    UnitTypeListService.init();
  }

  render() {
    return (
      <UnitTypeList
        types={toJS(UnitTypeListService.types)}
        fetching={UnitTypeListService.fetch.fetching}
        onDelete={UnitTypeListService.handleRemove}
      />
    );
  }
}

export default observer(UnitTypeListContainer);
