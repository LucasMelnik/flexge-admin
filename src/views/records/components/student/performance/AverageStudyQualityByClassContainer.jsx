import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudyQualityAverageGauge from '../../../../../core/chart/StudyQualityAverageGauge';
import AverageStudyQualityByClassService from '../../../services/AverageStudyQualityByClassService';

class AverageStudyQualityByClassContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    AverageStudyQualityByClassService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    console.log('this.props.classId', this.props.classId);
    const average = localStorage.getItem('COMPANY_MANAGER') ?
      AverageStudyQualityByClassService.allSchoolsAverage :
      AverageStudyQualityByClassService.averageByClass;
    return (
      <StudyQualityAverageGauge
        fetching={AverageStudyQualityByClassService.fetch.fetching}
        value={average}
        schoolAverage={AverageStudyQualityByClassService.allSchoolsAverage ?
          AverageStudyQualityByClassService.allSchoolsAverage.toFixed(1) : null}
      />
    );
  }
}

export default observer(AverageStudyQualityByClassContainer);
