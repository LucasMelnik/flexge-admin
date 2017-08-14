import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TimeAmountsList from './TimeAmounts';
import TimeAmountsListService from '../services/TimeAmountsListService';

class TimeAmountsContainer extends Component {

  componentWillMount() {
    TimeAmountsListService.load();
  }

  render() {
    return (
      <TimeAmountsList
        average={TimeAmountsListService.average}
        total={TimeAmountsListService.total}
        fetching={TimeAmountsListService.fetch.fetching}
      />
    );
  }
}

export default observer(TimeAmountsContainer);
