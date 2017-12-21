import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudiedTimeGroupService from '../../../services/StudiedTimeGroupService';
import StudyTimeHigherThanTwoGauge from '../../../../../core/chart/StudyTimeHigherThanTwoGauge';

class StudyTimeHigherThanTwoContainer extends Component {
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
    StudiedTimeGroupService.init(this.props.schoolId, this.props.classId);
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
        fetching={StudiedTimeGroupService.fetch.fetching}
        value={this.getValue(StudiedTimeGroupService.higherThanTwo) * 100}
        schoolAverage={this.getValue(StudiedTimeGroupService.higherThanTwoSchoolAverage) * 100}
        weeklyHoursRequired={this.school ? this.school.weeklyHoursRequired : 2}
      />
    );
  }
}

export default observer(StudyTimeHigherThanTwoContainer);
