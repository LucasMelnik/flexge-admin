import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SchoolEvaluationListService from '../services/SchoolEvaluationListService';
import SchoolEvaluationScene from './SchoolEvaluationScene';

class SchoolEvaluationSceneContainer extends Component {

  componentWillMount() {
    const school = JSON.parse(localStorage.getItem('school'));
    SchoolEvaluationListService.init(school ? school._id : null);
  }

  render() {
    return (
      <SchoolEvaluationScene
        schoolId={SchoolEvaluationListService.schoolId}
        fetching={SchoolEvaluationListService.fetch.fetching}
        selectedYear={SchoolEvaluationListService.selectedYear}
      />
    );
  }
}

export default observer(SchoolEvaluationSceneContainer);
