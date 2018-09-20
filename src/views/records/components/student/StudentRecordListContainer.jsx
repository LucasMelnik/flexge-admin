import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import StudentRecordList from './StudentRecordList';
import StudentRecordListService from '../../services/StudentRecordListService';

class StudentRecordListContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  handleSelect = (student) => {
    browserHistory.push(`/records/schools/${this.props.schoolId}/classes/${this.props.classId}/students/${student.id}/detail`);
  };

  render() {
    return (
      <StudentRecordList
        students={toJS(StudentRecordListService.students)}
        fetching={
          StudentRecordListService.fetch.fetching ||
          StudentRecordListService.fetchStudents.fetching
        }
        onSelect={this.handleSelect}
        onFilter={StudentRecordListService.load}
        onChange={StudentRecordListService.form.setValue}
        filterValues={StudentRecordListService.form.getValues()}
      />
    );
  }
}

export default observer(StudentRecordListContainer);
