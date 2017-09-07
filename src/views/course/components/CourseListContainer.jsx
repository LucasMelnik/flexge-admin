import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CourseList from './CourseList';
import CourseListService from '../services/CourseListService';

class CourseListContainer extends Component {

  componentDidMount() {
    CourseListService.init();
  }

  render() {
    return (
      <CourseList
        courses={toJS(CourseListService.courses)}
        fetching={CourseListService.fetch.fetching}
        onDelete={CourseListService.handleRemove}
      />
    );
  }
}

export default observer(CourseListContainer);
