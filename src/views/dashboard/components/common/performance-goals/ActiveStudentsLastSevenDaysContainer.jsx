import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import ActiveStudentsLastSevenDaysGauge from '../../../../../core/chart/ActiveStudentsLastSevenDaysGauge';

class ActiveStudentsLastSevenDaysContainer extends Component {
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
      <ActiveStudentsLastSevenDaysGauge
        fetching={ActiveStudentsByPeriodService.fetch.fetching}
        value={ActiveStudentsByPeriodService.studiedLast7Days ?
          Number(ActiveStudentsByPeriodService.studiedLast7Days.toFixed(0)) : 0
        }
        schoolAverage={ActiveStudentsByPeriodService.schoolAverageLast7Days ? 
          ActiveStudentsByPeriodService.schoolAverageLast7Days.toFixed(0) : 0}
      />
    );
  }
}

export default observer(ActiveStudentsLastSevenDaysContainer);
