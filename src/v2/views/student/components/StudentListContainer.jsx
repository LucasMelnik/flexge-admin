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
  }

  componentDidMount() {
    StudentListService.init();
  }

  render() {
    return (
      <StudentList
        students={toJS(StudentListService.students)}
        fetching={StudentListService.fetch.fetching}
        onDelete={StudentListService.handleRemove}
      />
    );
  }
}

export default observer(StudentListContainer);
