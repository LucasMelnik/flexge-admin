import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SchoolGradeConfigFormScene from './SchoolGradeConfigFormScene';
import SchoolGradeConfigFilterService from '../services/SchoolGradeConfigFilterService';

class SchoolGradeConfigFormSceneContainer extends Component {

  componentWillMount() {
    SchoolGradeConfigFilterService.handleFilterChange(localStorage.getItem('school'));
  }

  render() {
    return (
      <SchoolGradeConfigFormScene
        schoolId={SchoolGradeConfigFilterService.schoolId}
      />
    );
  }
}

export default observer(SchoolGradeConfigFormSceneContainer);
