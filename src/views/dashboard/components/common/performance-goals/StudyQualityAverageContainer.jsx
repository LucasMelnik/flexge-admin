import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

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
      <CircularProgress
        fetching={AverageStudyQualityService.fetch.fetching}
        noDataText="No Study Quality found"
        title="Study Quality"
        tooltip="Your classes Study Quality average"
        value={Number(average.toFixed(1)) + 5}
        max={20}
        valueRender={value => Number(value.toFixed(1)) - 5}
        successCondition={value => value > 10}
        badCondition={value => value < 5}
        legend={localStorage.role === 'TEACHER' &&
          `School average ${AverageStudyQualityService.allSchoolsAverage ?
            AverageStudyQualityService.allSchoolsAverage.toFixed(1) : 0
          }`}
      />
    );
  }
}

export default observer(StudyQualityAverageContainer);
