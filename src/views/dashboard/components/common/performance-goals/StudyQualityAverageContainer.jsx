import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import StudyQualityAverageGauge from '../../../../../core/chart/StudyQualityAverageGauge';

class StudyQualityAverageContainer extends Component {
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
    AverageStudyQualityService.init(this.props.schoolId, this.props.classId, this.props.query);
  }

  getValue = (value) => {
    if (value !== null && value !== undefined) {
      return Number(value.toFixed(0));
    }
    return null;
  }

  render() {
    const average = localStorage.role !== 'TEACHER' ?
      AverageStudyQualityService.allSchoolsAverage :
      AverageStudyQualityService.averageByClass;
    return (
      <StudyQualityAverageGauge
        fetching={AverageStudyQualityService.fetch.fetching}
        value={this.getValue(average)}
        schoolAverage={this.getValue(AverageStudyQualityService.allSchoolsAverage)}
      />
    );
  }
}

export default observer(StudyQualityAverageContainer);
