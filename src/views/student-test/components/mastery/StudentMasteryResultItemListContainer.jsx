import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentMasteryListService from '../../services/StudentMasteryListService';
import StudentMasteryResultItemList from './StudentMasteryResultItemList';

class StudentMasteryResultItemListContainer extends Component {

  static propTypes = {
    masteryId: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired,
    executionId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentMasteryListService.loadItems(this.props.masteryId, this.props.executionId);
  }

  render() {
    return (
      <StudentMasteryResultItemList
        studentId={this.props.studentId}
        masteryId={this.props.masteryId}
        executionId={this.props.executionId}
        items={toJS(StudentMasteryListService.items)}
      />
    );
  }
}

export default observer(StudentMasteryResultItemListContainer);
