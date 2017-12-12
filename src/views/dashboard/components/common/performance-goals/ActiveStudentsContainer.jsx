import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

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

  average = localStorage.getItem('COMPANY_MANAGER') ?
    ActiveStudentsByPeriodService.totalActiveStudents :
    ActiveStudentsByPeriodService.totalActiveStudentsByClass;

  render() {
    return (
      <CircularProgress
        title="Active Students"
        tooltip="Students which studied at least once on last 30 days"
        fetching={ActiveStudentsByPeriodService.fetch.fetching}
        noDataText="No Active Students Found"
        value={Number(this.average.toFixed(0))}
        max={100}
        successCondition={value => value > 85}
        badCondition={value => value <= 65}
        valueRender={value => `${value}%`}
        legend={`School Average ${ActiveStudentsByPeriodService.schoolAverage}%`}
      />
    );
  }
}

export default observer(ActiveStudentsContainer);
