import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import StudentListService from '../services/StudentListService';
import StudentRecordSelect from './StudentRecordSelect';

class StudentRecordSelectContainer extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  handleChange = (value) => {
    if (value && value.length > 2) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        StudentListService.searchStudents(value);
      }, 500);
    }
    this.props.onSelect(value);
  };

  render() {
    return (
      <StudentRecordSelect
        dataSource={toJS(StudentListService.students)}
        onChange={this.handleChange}
        onSelect={this.props.onSelect}
        value={this.props.value}
        disabled={this.props.disabled}
      />
    );
  }
}

export default observer(StudentRecordSelectContainer);
