import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodAndClassService from '../../../services/ActiveStudentsByPeriodAndClassService';
import ActiveStudentsGauge from '../../../../../core/chart/ActiveStudentsGauge';

class ActiveStudentsByClassContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    ActiveStudentsByPeriodAndClassService.init(this.props.schoolId, this.props.classId);
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
        fetching={ActiveStudentsByPeriodAndClassService.fetch.fetching}
        value={this.getValue(ActiveStudentsByPeriodAndClassService.totalActiveStudents)}
        schoolAverage={this.getValue(ActiveStudentsByPeriodAndClassService.schoolAverage)}
      />
    );
  }
}

export default observer(ActiveStudentsByClassContainer);
