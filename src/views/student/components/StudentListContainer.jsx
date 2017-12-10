import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentList from './StudentList';
import StudentListService from '../services/StudentListService';

class StudentListContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
    editable: PropTypes.bool,
    onSelect: PropTypes.func,
    baseUrl: PropTypes.string,
    hasSchoolClass: PropTypes.bool,
  };

  static defaultProps = {
    baseUrl: '',
    schoolId: null,
    classId: null,
    editable: false,
    onSelect: null,
    hasSchoolClass: true,
  };

  componentDidMount() {
    StudentListService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <StudentList
        students={toJS(StudentListService.students)}
        fetching={StudentListService.fetch.fetching}
        onDelete={StudentListService.handleRemove}
        editable={this.props.editable}
        onSelect={this.props.onSelect}
        baseUrl={this.props.baseUrl}
        hasSchoolClass={this.props.hasSchoolClass}
      />
    );
  }
}

export default observer(StudentListContainer);
