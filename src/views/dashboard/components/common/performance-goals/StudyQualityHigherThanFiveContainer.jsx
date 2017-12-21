import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudyQualityGroupService from '../../../services/StudyQualityGroupService';
import StudyQualityHigherThanFiveGauge from '../../../../../core/chart/StudyQualityHigherThanFiveGauge';

class StudyQualityHigherThanFiveContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    StudyQualityGroupService.init(this.props.schoolId, this.props.classId);
  }

  getValue = () => {
    if (StudyQualityGroupService.higherThanFive !== null && StudyQualityGroupService.higherThanFive !== undefined) {
      return Number(StudyQualityGroupService.higherThanFive.toFixed(0));
    }
    return null;
  };

  render() {
    return (
      <StudyQualityHigherThanFiveGauge
        fetching={StudyQualityGroupService.fetch.fetching}
        value={this.getValue()}
        schoolAverage={
          StudyQualityGroupService.higherThanFiveSchoolAverage ?
          Number(StudyQualityGroupService.higherThanFiveSchoolAverage.toFixed(0)) : 0
        }
      />
    );
  }
}

export default observer(StudyQualityHigherThanFiveContainer);
