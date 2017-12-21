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

  render() {
    return (
      <StudyTimeHigherThanTwoGauge
        fetching={StudiedTimeGroupByClassService.fetch.fetching}
        value={StudiedTimeGroupByClassService.higherThanTwo ?
          Number((StudiedTimeGroupByClassService.higherThanTwo * 100).toFixed(0)) : 0
        }
        schoolAverage={
          StudiedTimeGroupByClassService.higherThanTwoSchoolAverage ?
          Number((StudiedTimeGroupByClassService.higherThanTwo * 100).toFixed(0)) : 0
        }
        weeklyHoursRequired={this.school ? this.school.weeklyHoursRequired : 2}
      />
    );
  }
}

export default observer(StudyTimeHigherThanTwoByClassContainer);
