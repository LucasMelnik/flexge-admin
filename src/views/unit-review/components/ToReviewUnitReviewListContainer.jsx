import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitReviewList from './UnitReviewList';
import UnitReviewListService from '../services/UnitReviewListService';

class ToReviewUnitReviewListContainer extends Component {
  unitReviewsService = new UnitReviewListService();

  componentDidMount() {
    this.unitReviewsService.isReview(true);
  }

  render() {
    return (
      <UnitReviewList
        units={toJS(this.unitReviewsService.units)}
        fetching={this.unitReviewsService.fetch.fetching}
      />
    );
  }
}

export default observer(ToReviewUnitReviewListContainer);
