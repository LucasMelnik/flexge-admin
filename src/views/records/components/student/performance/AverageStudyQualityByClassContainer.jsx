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

  getValue = (value) => {
    if (value !== null && value !== undefined) {
      return Number(value.toFixed(0));
    }
    return null;
  }

  render() {
    const average = localStorage.getItem('COMPANY_MANAGER') ?
      AverageStudyQualityByClassService.allSchoolsAverage :
      AverageStudyQualityByClassService.averageByClass;
    return (
      <StudyQualityAverageGauge
        fetching={AverageStudyQualityByClassService.fetch.fetching}
        value={this.getValue(average)}
        schoolAverage={this.getValue(AverageStudyQualityByClassService.allSchoolsAverage)}
      />
    );
  }
}

export default observer(AverageStudyQualityByClassContainer);
