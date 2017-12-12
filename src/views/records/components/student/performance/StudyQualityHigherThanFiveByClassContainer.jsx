import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudyQualityGroupByClassService from '../../../services/StudyQualityGroupByClassService';
import StudyQualityHigherThanFiveGauge from '../../../../../core/chart/StudyQualityHigherThanFiveGauge';

class StudyQualityHigherThanFiveByClassContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    StudyQualityGroupByClassService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <StudyQualityHigherThanFiveGauge
        fetching={StudyQualityGroupByClassService.fetch.fetching}
        value={
          StudyQualityGroupByClassService.higherThanFive ?
          Number(StudyQualityGroupByClassService.higherThanFive.toFixed(0)) : 0
        }
        schoolAverage={
          StudyQualityGroupByClassService.higherThanFiveSchoolAverage ?
          StudyQualityGroupByClassService.higherThanFiveSchoolAverage : 0
        }
      />
    );
  }
}

export default observer(StudyQualityHigherThanFiveByClassContainer);
