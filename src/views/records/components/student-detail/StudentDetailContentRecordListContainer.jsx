import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailContentRecordList from './StudentDetailContentRecordList';
import StudentRecordDetailService from '../../services/StudentRecordDetailService';

class StudentDetailContentRecordListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentRecordDetailService.loadByContent(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailContentRecordList
        contents={toJS(StudentRecordDetailService.contentsDetail)}
        fetching={StudentRecordDetailService.fetchContent.fetching}
      />
    );
  }
}

export default observer(StudentDetailContentRecordListContainer);
