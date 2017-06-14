import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitReviewList from './UnitReviewList';
import UnitReviewListService from '../services/UnitReviewListService';

class MyUnitReviewListContainer extends Component {
  unitReviewsService = new UnitReviewListService();

  componentDidMount() {
    this.unitReviewsService.isReview(false);
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

export default observer(MyUnitReviewListContainer);
