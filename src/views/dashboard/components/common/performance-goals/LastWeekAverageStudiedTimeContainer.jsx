import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import moment from 'moment';
import get from 'lodash/get';
import 'moment-duration-format';
import LastWeekAverageStudiedTimeService from '../../../services/LastWeekAverageStudiedTimeService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

class ActiveStudentsLastSevenDaysContainer extends Component {
  school = JSON.parse(localStorage.getItem('school'));

  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    LastWeekAverageStudiedTimeService.init(this.props.schoolId, this.props.classId);
  }

  average = localStorage.getItem('COMPANY_MANAGER') ?
    get(LastWeekAverageStudiedTimeService.fetch, 'data.schoolAverageStudiedTime') :
    LastWeekAverageStudiedTimeService.averageStudiedTimeByClass;

  render() {
    return (
      <CircularProgress
        fetching={LastWeekAverageStudiedTimeService.fetch.fetching}
        noDataText="No data found"
        title="Average time last week"
        tooltip="Average studied time from Monday to Sunday last week"
        value={this.average}
        max={this.school ? this.school.weeklyHoursRequired : 2}
        successCondition={value => value > this.school ? this.school.weeklyHoursRequired : 2}
        badCondition={value => value <= 0.999}
        valueRender={value => moment.duration(value, 'hours').format('hh:mm', { trim: false })}
        legend={localStorage.role === 'TEACHER' &&
          `School average ${
            moment.duration(get(LastWeekAverageStudiedTimeService.fetch, 'data.schoolAverageStudiedTime'), 'hours').format('hh:mm', { trim: false })}`
        }
      />
    );
  }
}

export default observer(ActiveStudentsLastSevenDaysContainer);
