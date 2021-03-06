import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import 'moment-duration-format';
import LastWeekAverageStudiedTimeByClassService from '../../../services/LastWeekAverageStudiedTimeByClassService';
import LastWeekAverageStudiedTimeGauge from '../../../../../core/chart/LastWeekAverageStudiedTimeGauge';

class LastWeekAverageStudiedTimeByClassContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    LastWeekAverageStudiedTimeByClassService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <LastWeekAverageStudiedTimeGauge
        fetching={LastWeekAverageStudiedTimeByClassService.fetch.fetching}
        value={LastWeekAverageStudiedTimeByClassService.average}
        schoolAverage={LastWeekAverageStudiedTimeByClassService.schoolAverage}
        weeklyHoursRequired={1.5}
      />
    );
  }
}

export default observer(LastWeekAverageStudiedTimeByClassContainer);
