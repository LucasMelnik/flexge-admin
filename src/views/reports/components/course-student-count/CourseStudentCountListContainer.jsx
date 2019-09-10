import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CourseStudentCountList from './CourseStudentCountList';
import CourseStudentCountListService from '../../services/CourseStudentCountListService';

class CourseStudentCountListContainer extends Component {

  componentDidMount() {
    CourseStudentCountListService.init();
  }

  render() {
    return (
      <CourseStudentCountList
        courses={toJS(CourseStudentCountListService.courses)}
        fetching={CourseStudentCountListService.fetch.fetching}
      />
    );
  }
}

export default observer(CourseStudentCountListContainer);
