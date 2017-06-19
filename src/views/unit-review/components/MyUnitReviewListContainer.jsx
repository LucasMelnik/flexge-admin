import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitReviewList from './UnitReviewList';
import UnitReviewListService from '../services/UnitReviewListService';

class MyUnitReviewListContainer extends Component {

  componentDidMount() {
    UnitReviewListService.handleMyUnitsToReview();
  }

  render() {
    return (
      <UnitReviewList
        units={toJS(UnitReviewListService.myUnits)}
        fetching={UnitReviewListService.fetch.fetching}
        onSendReview={UnitReviewListService.onSendReview}
      />
    );
  }
}

export default observer(MyUnitReviewListContainer);
