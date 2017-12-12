import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudyQualityGroupService from '../../../services/StudyQualityGroupService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

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
      <CircularProgress
        fetching={StudyQualityGroupService.fetch.fetching}
        noDataText="No Study Quality found"
        title="Study Quality > 5"
        tooltip="Students with Study Quality higher than 5"
        value={StudyQualityGroupService.higherThanFive ?
          Number(StudyQualityGroupService.higherThanFive.toFixed(0)) : 0
        }
        max={100}
        successCondition={value => value > 50}
        badCondition={value => value <= 35}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && `School average ${
          StudyQualityGroupService.higherThanFiveSchoolAverage ?
            StudyQualityGroupService.higherThanFiveSchoolAverage : 0}%`
        }
      />
    );
  }
}

export default observer(StudyQualityHigherThanFiveContainer);
