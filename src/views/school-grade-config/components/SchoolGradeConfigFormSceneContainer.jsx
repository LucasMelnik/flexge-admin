import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SchoolGradeConfigFormScene from './SchoolGradeConfigFormScene';
import SchoolGradeConfigFilterService from '../services/SchoolGradeConfigFilterService';

class SchoolGradeConfigFormSceneContainer extends Component {

  componentWillMount() {
    const school = JSON.parse(localStorage.getItem('school'));
    SchoolGradeConfigFilterService.handleFilterChange(school ? school._id : null);
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
