import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ClassEnglishLevelOverview from './ClassEnglishLevelOverview';
import StudentRecordListService from '../../services/StudentRecordListService';

class ClassEnglishLevelOverviewContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentRecordListService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <ClassEnglishLevelOverview
        students={toJS(StudentRecordListService.students)}
        fetching={StudentRecordListService.fetch.fetching}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default observer(ClassEnglishLevelOverviewContainer);
