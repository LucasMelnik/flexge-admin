import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import TimeAmountsList from './TimeAmountsList';
import TimeAmountsListService from '../services/TimeAmountsListService';

class TimeAmountsListContainer extends Component {

  static propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  };

  componentWillMount() {
    TimeAmountsListService.load();
  }

  render() {
    return (
      <TimeAmountsList
        amounts={toJS(TimeAmountsListService.timeAmounts.slice(this.props.from, this.props.to))}
        fetching={TimeAmountsListService.fetch.fetching}
      />
    );
  }
}

export default observer(TimeAmountsListContainer);
