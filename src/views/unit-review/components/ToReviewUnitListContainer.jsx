import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ToReviewUnitList from './ToReviewUnitList';
import UnitReviewListService from '../services/UnitReviewListService';

class ToReviewUnitListContainer extends Component {

  componentDidMount() {
    UnitReviewListService.load();
  }

  render() {
    return (
      <ToReviewUnitList
        reviews={toJS(UnitReviewListService.unitsAndReviews)}
        fetching={UnitReviewListService.fetch.fetching}
      />
    );
  }
}

export default observer(ToReviewUnitListContainer);
