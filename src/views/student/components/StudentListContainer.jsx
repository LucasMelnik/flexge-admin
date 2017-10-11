import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentList from './StudentList';
import StudentListService from '../services/StudentListService';

class StudentListContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string,
    companyId: PropTypes.string,
    schoolId: PropTypes.string,
    classId: PropTypes.string,
    editable: PropTypes.bool,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    distributorId: null,
    companyId: null,
    schoolId: null,
    classId: null,
    editable: false,
    onSelect: null,
  };

  componentDidMount() {
    StudentListService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <StudentList
        students={toJS(StudentListService.students)}
        fetching={StudentListService.fetch.fetching}
        editable={this.props.editable}
        onDelete={StudentListService.handleRemove}
        onSelect={this.props.onSelect}
        distributorId={this.props.distributorId}
        companyId={this.props.companyId}
        schoolId={this.props.schoolId}
        classId={this.props.classId}
      />
    );
  }
}

export default observer(StudentListContainer);
