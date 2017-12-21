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

  render() {
    return (
      <StudyTimeHigherThanTwoGauge
        fetching={StudiedTimeGroupService.fetch.fetching}
        value={StudiedTimeGroupService.higherThanTwo ?
          Number((StudiedTimeGroupService.higherThanTwo * 100).toFixed(0)) : null
        }
        schoolAverage={
          StudiedTimeGroupService.higherThanTwoSchoolAverage ?
          Number((StudiedTimeGroupService.higherThanTwo * 100).toFixed(0)) : 0
        }
        weeklyHoursRequired={this.school ? this.school.weeklyHoursRequired : 2}
      />
    );
  }
}

export default observer(StudyTimeHigherThanTwoContainer);
