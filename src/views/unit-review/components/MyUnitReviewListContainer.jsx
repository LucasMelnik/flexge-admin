import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitReviewList from './UnitReviewList';
import UnitReviewListService from '../services/UnitReviewListService';

class MyUnitReviewListContainer extends Component {

  componentDidMount() {
    UnitReviewListService.load();
  }

  render() {
    return (
      <UnitReviewList
        units={toJS(UnitReviewListService.myUnits)}
        fetching={UnitReviewListService.fetch.fetching}
      />
    );
  }
}

export default observer(MyUnitReviewListContainer);
