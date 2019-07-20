import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentMasteryListService from '../../services/StudentMasteryListService';
import StudentMasteryList from './StudentMasteryList';

class StudentMasteryListContainer extends Component {

  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentMasteryListService.init(this.props.studentId);
  }

  render() {
    return (
      <StudentMasteryList
        masteries={toJS(StudentMasteryListService.masteries)}
        fetching={StudentMasteryListService.fetch.fetching}
        onSelect={this.props.onSelect}
        onReset={StudentMasteryListService.resetMasteryTest}
      />
    );
  }
}

export default observer(StudentMasteryListContainer);
