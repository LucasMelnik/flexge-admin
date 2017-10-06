import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { browserHistory } from 'react-router';
import StudentListService from '../../services/StudentListService';
import StudentRecordSelect from './StudentRecordSelect';

class StudentRecordSelectContainer extends Component {

  state = { value: '' };

  handleChange = (value) => {
    if (value && value.length > 2) {
      StudentListService.searchStudents(value);
    }
    this.setState({
      value: value || '',
    });
  };

  handleSelect = (value) => {
    browserHistory.push(`reports/records/student/${value}/details`);
  };

  render() {
    return (
      <StudentRecordSelect
        dataSource={toJS(StudentListService.students)}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        value={this.state.value}
      />
    );
  }
}

export default observer(StudentRecordSelectContainer);
