import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import TeacherList from './TeacherList';
import TeacherListService from '../services/TeacherListService';

class TeacherListContainer extends Component {

  componentDidMount() {
    TeacherListService.init();
  }

  render() {
    return (
      <TeacherList
        teachers={toJS(TeacherListService.teachers)}
        fetching={TeacherListService.fetch.fetching}
        onDelete={TeacherListService.handleRemove}
      />
    );
  }
}

export default observer(TeacherListContainer);
