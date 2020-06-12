import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import StudentAutoCompleteService from '../services/StudentAutoCompleteService';
import StudentAutoComplete from './StudentAutoComplete';

class StudentAutoCompleteContainer extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
  };

  studentAutoCompleteService = new StudentAutoCompleteService();

  handleChange = (value) => {
    if (value && value.length > 2) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.studentAutoCompleteService.searchStudents(value);
      }, 500);
    }
    this.props.onChange(value);
  };

  render() {
    return (
      <StudentAutoComplete
        dataSource={toJS(this.studentAutoCompleteService.students)}
        onChange={this.handleChange}
        onSelect={this.props.onSelect}
        value={this.props.value}
        disabled={this.props.disabled}
        required={this.props.required}
        errorText={this.props.errorText}
      />
    );
  }
}

export default observer(StudentAutoCompleteContainer);
