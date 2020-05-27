import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import ActiveStudentsGauge from '../../../../../core/chart/ActiveStudentsGauge';

class ActiveStudentsContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
    query: PropTypes.object,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    ActiveStudentsByPeriodService.init(this.props.schoolId, this.props.classId, this.props.query);
  }

  getValue = (value) => {
    if (value !== null && value !== undefined) {
      return Number(value.toFixed(0));
    }
    return null;
  }

  render() {
    return (
      <ActiveStudentsGauge
        fetching={ActiveStudentsByPeriodService.fetch.fetching}
        value={this.getValue(ActiveStudentsByPeriodService.totalActiveStudents)}
        schoolAverage={this.getValue(ActiveStudentsByPeriodService.schoolAverage)}
      />
    );
  }
}

export default observer(ActiveStudentsContainer);
