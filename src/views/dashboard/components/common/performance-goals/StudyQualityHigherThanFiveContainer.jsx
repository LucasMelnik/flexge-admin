import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudyQualityGroupService from '../../../services/StudyQualityGroupService';
import StudyQualityHigherThanFiveGauge from '../../../../../core/chart/StudyQualityHigherThanFiveGauge';

class StudyQualityHigherThanFiveContainer extends Component {
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
    StudyQualityGroupService.init(this.props.schoolId, this.props.classId, this.props.query);
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
        fetching={StudyQualityGroupService.fetch.fetching}
        value={this.getValue(StudyQualityGroupService.higherThanFive)}
        schoolAverage={this.getValue(StudyQualityGroupService.higherThanFiveSchoolAverage)}
      />
    );
  }
}

export default observer(StudyQualityHigherThanFiveContainer);
