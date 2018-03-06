import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailAchievementList from './StudentDetailAchievementList';
import StudentDetailAchievementListService from '../../services/StudentDetailAchievementListService';

class StudentDetailAchievementListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentDetailAchievementListService = new StudentDetailAchievementListService();
  componentDidMount() {
    this.studentDetailAchievementListService.init(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailAchievementList
        achievements={toJS(this.studentDetailAchievementListService.achievements)}
        fetching={this.studentDetailAchievementListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentDetailAchievementListContainer);
