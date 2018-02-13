import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import RankingList from './RankingList';
import RankingListService from '../services/RankingListService';

class RankingListContainer extends Component {

  static propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
  };

  componentDidMount() {
    RankingListService.registerLevel(
      this.props.level,
      this.props.from,
      this.props.to,
    );
  }

  render() {
    return (
      <RankingList
        rankings={toJS(RankingListService.rankingsByLevel[this.props.level]) || []}
        fetching={RankingListService.fetch.fetching}
      />
    );
  }
}

export default observer(RankingListContainer);
