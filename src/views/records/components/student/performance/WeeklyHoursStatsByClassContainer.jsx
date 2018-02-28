import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import WeeklyHoursStatsGauge from '../../../../../core/chart/WeeklyHoursStatsGauge';
import WeeklyHoursStatsByClassService from '../../../services/WeeklyHoursStatsByClassService';

class WeeklyHoursStatsByClassContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    WeeklyHoursStatsByClassService.init(this.props.schoolId, this.props.classId);
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
        fetching={WeeklyHoursStatsByClassService.fetch.fetching}
        value={this.getValue(WeeklyHoursStatsByClassService.classPercentage)}
        schoolAverage={this.getValue(WeeklyHoursStatsByClassService.schoolAveragePercentage)}
      />
    );
  }
}

export default observer(WeeklyHoursStatsByClassContainer);
