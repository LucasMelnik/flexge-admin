import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import RankingList from './RankingList';
import RankingListService from '../services/RankingListService';

class NationalRankingListContainer extends Component {

  componentDidMount() {
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = JSON.parse(localStorage.getItem('school'));
      RankingListService.init(school._id);
      RankingListService.loadNationalRanking();
    }
  }

  render() {
    return (
      <RankingList
        rankings={toJS(RankingListService.nationalRanking)}
        fetching={RankingListService.fetchNational.fetching}
      />
    );
  }
}

export default observer(NationalRankingListContainer);
