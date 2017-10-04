import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentMasteryListService from '../../services/StudentMasteryListService';
import StudentMasteryResultList from './StudentMasteryResultList';

class StudentMasteryResultListContainer extends Component {

  static propTypes = {
    masteryId: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  componentDidMount() {
    StudentMasteryListService.loadResults(this.props.masteryId);
  }

  render() {
    return (
      <StudentMasteryResultList
        executions={toJS(StudentMasteryListService.executions)}
        fetching={StudentMasteryListService.fetch.fetching}
        masteryId={this.props.masteryId}
        studentId={this.props.studentId}
        onSelect={this.props.onSelect}
      />
    );
  }
}

export default observer(StudentMasteryResultListContainer);
