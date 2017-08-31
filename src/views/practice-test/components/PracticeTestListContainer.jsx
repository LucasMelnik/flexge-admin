import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PracticeTestList from './PracticeTestList';
import PracticeTestListService from '../services/PracticeTestListService';

class PracticeTestListContainer extends Component {

  componentDidMount() {
    PracticeTestListService.handleLoad();
  }

  render() {
    return (
      <PracticeTestList
        practiceTests={toJS(PracticeTestListService.practiceTests)}
        fetching={PracticeTestListService.fetch.fetching}
        onDelete={PracticeTestListService.handleRemove}
      />
    );
  }
}

export default observer(PracticeTestListContainer);
