import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import ActiveStudentsGauge from '../../../../../core/chart/ActiveStudentsGauge';

class ActiveStudentsContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    ActiveStudentsByPeriodService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <ActiveStudentsGauge
        fetching={ActiveStudentsByPeriodService.fetch.fetching}
        value={ActiveStudentsByPeriodService.totalActiveStudents ?
          Number(ActiveStudentsByPeriodService.totalActiveStudents.toFixed(0)) : 0
        }
        schoolAverage={ActiveStudentsByPeriodService.schoolAverage ?
          ActiveStudentsByPeriodService.schoolAverage.toFixed(0) : 0}
      />
    );
  }
}

export default observer(ActiveStudentsContainer);
