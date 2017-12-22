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

  getValue = (value) => {
    if (value !== null && value !== undefined) {
      return Number(value.toFixed(0));
    }
    return null;
  }

  render() {
    return (
      <ActiveStudentsLastSevenDaysGauge
        fetching={ActiveStudentsByPeriodService.fetch.fetching}
        value={this.getValue(ActiveStudentsByPeriodService.studiedLast7Days)}
        schoolAverage={this.getValue(ActiveStudentsByPeriodService.schoolAverageLast7Days)}
      />
    );
  }
}

export default observer(ActiveStudentsLastSevenDaysContainer);
