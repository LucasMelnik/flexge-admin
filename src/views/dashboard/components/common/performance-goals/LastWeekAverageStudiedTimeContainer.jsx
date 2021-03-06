import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import 'moment-duration-format';
import LastWeekAverageStudiedTimeService from '../../../services/LastWeekAverageStudiedTimeService';
import LastWeekAverageStudiedTimeGauge from '../../../../../core/chart/LastWeekAverageStudiedTimeGauge';

class LastWeekAverageStudiedTimeContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
    query: PropTypes.object,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
    query: null,
  };

  componentWillMount() {
    LastWeekAverageStudiedTimeService.init(this.props.schoolId, this.props.classId, this.props.query);
  }

  render() {
    return (
      <LastWeekAverageStudiedTimeGauge
        fetching={LastWeekAverageStudiedTimeService.fetch.fetching}
        value={LastWeekAverageStudiedTimeService.average}
        schoolAverage={LastWeekAverageStudiedTimeService.schoolAverage}
        weeklyHoursRequired={1.5}
      />
    );
  }
}

export default observer(LastWeekAverageStudiedTimeContainer);
