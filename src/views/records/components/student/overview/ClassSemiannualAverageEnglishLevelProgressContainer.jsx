import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ClassSemiannualAverageEnglishLevelProgress from './ClassSemiannualAverageEnglishLevelProgress';
import ClassSemiannualAverageEnglishLevelProgressService from '../../../services/ClassSemiannualAverageEnglishLevelProgressService';

class ClassSemiannualAverageEnglishLevelProgressContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    ClassSemiannualAverageEnglishLevelProgressService.load(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <ClassSemiannualAverageEnglishLevelProgress
        progress={ClassSemiannualAverageEnglishLevelProgressService.data}
      />
    );
  }
}

export default observer(ClassSemiannualAverageEnglishLevelProgressContainer);
