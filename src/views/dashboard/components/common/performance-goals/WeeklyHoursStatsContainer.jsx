import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import WeeklyHoursStatsService from '../../../services/WeeklyHoursStatsService';
import WeeklyHoursStatsGauge from '../../../../../core/chart/WeeklyHoursStatsGauge';

class WeeklyHoursStatsContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    WeeklyHoursStatsService.init(this.props.schoolId, this.props.classId);
  }

  getValue = (value) => {
    if (value !== null && value !== undefined) {
      return Number((value * 100).toFixed(0));
    }
    return null;
  };

  render() {
    return (
      <WeeklyHoursStatsGauge
        fetching={WeeklyHoursStatsService.fetch.fetching}
        value={this.getValue(WeeklyHoursStatsService.value)}
        schoolAverage={this.getValue(WeeklyHoursStatsService.schoolAveragePercentage)}
      />
    );
  }
}

export default observer(WeeklyHoursStatsContainer);
