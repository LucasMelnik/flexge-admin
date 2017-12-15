import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentDetailContentRecordListFilter from './StudentDetailContentRecordListFilter';
import StudentRecordDetailService from '../../services/StudentRecordDetailService';

const StudentDetailContentRecordListFilterContainer = props => (
  <StudentDetailContentRecordListFilter
    course={StudentRecordDetailService.courseId}
    onFilter={StudentRecordDetailService.handleContentFilterChange}
    studentId={props.studentId}
  />
);

StudentDetailContentRecordListFilterContainer.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default observer(StudentDetailContentRecordListFilterContainer);
