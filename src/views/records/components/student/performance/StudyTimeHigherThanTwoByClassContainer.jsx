import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudiedTimeGroupByClassService from '../../../services/StudiedTimeGroupByClassService';
import StudyTimeHigherThanTwoGauge from '../../../../../core/chart/StudyTimeHigherThanTwoGauge';

class StudyTimeHigherThanTwoByClassContainer extends Component {
  school = JSON.parse(localStorage.getItem('school'));

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    StudiedTimeGroupByClassService.init(this.props.schoolId, this.props.classId);
  }

  getValue = (value) => {
    if (value !== null && value !== undefined) {
      return Number(value.toFixed(0));
    }
    return null;
  }

  render() {
    return (
      <StudyTimeHigherThanTwoGauge
        fetching={StudiedTimeGroupByClassService.fetch.fetching}
        value={this.getValue(StudiedTimeGroupByClassService.higherThanTwo) * 100}
        schoolAverage={this.getValue(StudiedTimeGroupByClassService.higherThanTwoSchoolAverage) * 100}
        weeklyHoursRequired={this.school ? this.school.weeklyHoursRequired : 2}
      />
    );
  }
}

export default observer(StudyTimeHigherThanTwoByClassContainer);
