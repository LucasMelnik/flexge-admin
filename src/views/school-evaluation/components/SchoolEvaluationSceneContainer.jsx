import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolEvaluationListService from '../services/SchoolEvaluationListService';
import SchoolEvaluationScene from './SchoolEvaluationScene';

class SchoolEvaluationSceneContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    SchoolEvaluationListService.init(this.props.params.schoolId);
  }

  render() {
    return (
      <SchoolEvaluationScene
        schoolId={this.props.params.schoolId}
        fetching={SchoolEvaluationListService.fetch.fetching}
        selectedYear={SchoolEvaluationListService.selectedYear}
      />
    );
  }
}

export default observer(SchoolEvaluationSceneContainer);
