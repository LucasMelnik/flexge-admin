import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DemoStudentList from './DemoStudentList';
import DemoStudentListService from '../services/DemoStudentListService';

class DemoStudentListContainer extends Component {
  componentDidMount() {
    DemoStudentListService.init();
  }

  render() {
    return (
      <DemoStudentList
        students={toJS(DemoStudentListService.students)}
        fetching={DemoStudentListService.fetch.fetching}
      />
    );
  }
}

export default observer(DemoStudentListContainer);
