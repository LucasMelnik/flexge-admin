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

  render() {
    return (
      <StudyQualityHigherThanFiveGauge
        fetching={StudyQualityGroupService.fetch.fetching}
        value={
          StudyQualityGroupService.higherThanFive ?
          Number(StudyQualityGroupService.higherThanFive.toFixed(0)) : 0
        }
        schoolAverage={
          StudyQualityGroupService.higherThanFiveSchoolAverage ?
          StudyQualityGroupService.higherThanFiveSchoolAverage : 0
        }
      />
    );
  }
}

export default observer(StudyQualityHigherThanFiveContainer);
