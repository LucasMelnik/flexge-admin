import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentOverviewRecordDetailService from '../../services/StudentOverviewRecordDetailService';
import Async from '../../../../core/layout/Async';
import Tag from '../../../../core/layout/Tag';

class StudentDetailRecordTabContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Async
        fetching={
          StudentOverviewRecordDetailService.fetch.fetching ||
          !StudentOverviewRecordDetailService.student.id
        }
      >
        {StudentOverviewRecordDetailService.student && StudentOverviewRecordDetailService.student.currentCourse ? this.props.children : (
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <Tag>The student does not have a course. The student needs to finish the placement test or you should add a course to him.</Tag>
          </div>
        )}
      </Async>
    );
  }
}

export default observer(StudentDetailRecordTabContainer);
