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

  getValue = (value) => {
    if (value !== null && value !== undefined) {
      return Number(value.toFixed(0));
    }
    return null;
  }

  render() {
    return (
      <StudyQualityHigherThanFiveGauge
        fetching={StudyQualityGroupByClassService.fetch.fetching}
        value={this.getValue(StudyQualityGroupByClassService.higherThanFive)}
        schoolAverage={this.getValue(StudyQualityGroupByClassService.higherThanFiveSchoolAverage)}
      />
    );
  }
}

export default observer(StudyQualityHigherThanFiveByClassContainer);
