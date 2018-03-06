import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import RankingList from './RankingList';
import RankingListService from '../services/RankingListService';
import RankingListFilterService from '../services/RankingListFilterService';

class RankingListContainer extends Component {
  static propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['month', 'semester', 'year', 'all']).isRequired,
  };

  rankingListService = new RankingListService();
  componentDidMount() {
    this.rankingListService.init(
      this.props.level,
      this.props.from,
      this.props.to,
    );
    RankingListFilterService.registerService(this.props.type, this.rankingListService);
  }

  render() {
    return (
      <RankingList
        rankings={toJS(this.rankingListService.rankings) || []}
        fetching={this.rankingListService.fetch.fetching}
      />
    );
  }
}

export default observer(RankingListContainer);
