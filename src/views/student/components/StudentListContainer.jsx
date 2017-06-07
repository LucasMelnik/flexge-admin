import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentList from './StudentList';
import StudentListService from '../services/StudentListService';

class StudentListContainer extends Component {

  componentDidMount() {
    StudentListService.init();
  }

  render() {
    return (
      <StudentList
        students={toJS(StudentListService.students)}
        fetching={StudentListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentListContainer);
