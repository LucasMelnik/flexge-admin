import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import StudentAutoCompleteContainer from '../../../../core/form/StudentAutoCompleteContainer';

class StudentRecordSelectContainer extends Component {

  state = { value: '' };

  handleChange = (value) => {
    this.setState({
      value: value || '',
    });
  };

  handleSelect = (value, student) => {
    browserHistory.push(`/records/schools/${student.schoolClass.school.id}/classes/${student.schoolClass.id}/students/${value}/detail`);
  };

  render() {
    return (
      <StudentAutoCompleteContainer
        onSelect={this.handleSelect}
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
  }
}

export default observer(StudentRecordSelectContainer);
