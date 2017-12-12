import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

class PerformanceGoalsStudyQualityAverageContainer extends Component {
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

  average = localStorage.getItem('COMPANY_MANAGER') ?
    AverageStudyQualityService.allSchoolsAverage :
    AverageStudyQualityService.averageByClass;

  render() {
    return (
      <CircularProgress
        fetching={AverageStudyQualityService.fetch.fetching}
        noDataText="No Study Quality found"
        title="Study Quality"
        tooltip="Your classes Study Quality average"
        value={Number(this.average.toFixed(1)) + 5}
        max={20}
        valueRender={value => Number(value.toFixed(1)) - 5}
        successCondition={value => value > 10}
        badCondition={value => value < 5}
        legend={localStorage.role === 'TEACHER' && `School average ${AverageStudyQualityService.allSchoolsAverage.toFixed(1)}`}
      />
    );
  }
}

export default observer(PerformanceGoalsStudyQualityAverageContainer);
