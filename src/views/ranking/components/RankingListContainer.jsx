import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import RankingList from './RankingList';
import RankingListService from '../services/RankingListService';

class RankingListContainer extends Component {

  static propTypes = {
    school: PropTypes.string,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
  };

  static defaultProps = {
    school: null,
  };

  rankingListService = new RankingListService();
  componentDidMount() {
    if (this.props.school) {
      this.rankingListService.load(
        this.props.school,
        this.props.from,
        this.props.to,
        this.props.level,
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.school !== this.props.school ||
      nextProps.from !== this.props.from
    ) {
      this.rankingListService.load(nextProps.school, nextProps.from, nextProps.to, nextProps.level);
    }
  }

  render() {
    return (
      <RankingList
        rankings={toJS(this.rankingListService.rankings)}
        fetching={this.rankingListService.fetch.fetching}
      />
    );
  }
}

export default observer(RankingListContainer);
