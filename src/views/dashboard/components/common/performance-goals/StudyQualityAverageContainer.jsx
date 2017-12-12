import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import StudyQualityAverageGauge from '../../../../../core/chart/StudyQualityAverageGauge';

class StudyQualityAverageContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    AverageStudyQualityService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    let average = localStorage.getItem('COMPANY_MANAGER') ?
      AverageStudyQualityService.allSchoolsAverage :
      AverageStudyQualityService.averageByClass;
    average = average || 0;
    return (
      <StudyQualityAverageGauge
        fetching={AverageStudyQualityService.fetch.fetching}
        value={average}
        schoolAverage={AverageStudyQualityService.allSchoolsAverage ?
          AverageStudyQualityService.allSchoolsAverage.toFixed(1) : null}
      />
    );
  }
}

export default observer(StudyQualityAverageContainer);
