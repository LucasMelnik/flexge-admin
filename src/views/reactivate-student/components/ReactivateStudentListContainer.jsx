import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ReactivateStudentList from './ReactivateStudentList';
import ReactivateStudentListService from '../services/ReactivateStudentListService';

class ReactivateStudentListContainer extends Component {

  componentDidMount() {
    ReactivateStudentListService.init();
  }

  render() {
    return (
      <ReactivateStudentList
        students={toJS(ReactivateStudentListService.students)}
        fetching={ReactivateStudentListService.fetch.fetching}
      />
    );
  }
}

export default observer(ReactivateStudentListContainer);
