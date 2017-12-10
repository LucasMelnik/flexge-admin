import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolDetailService from '../../../school/services/SchoolDetailService';
import SchoolClassRecordScene from './SchoolClassRecordScene';

class SchoolClassRecordSceneContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
    }).isRequired,
  };

  schoolDetailService = new SchoolDetailService();

  componentWillMount() {
    this.schoolDetailService.handleLoadSchool(this.props.params.schoolId);
  }

  render() {
    return (
      <SchoolClassRecordScene
        school={this.schoolDetailService.school}
        schoolId={this.props.params.schoolId}
        fetching={this.schoolDetailService.fetchSchool.fetching}
      />
    );
  }
}

export default observer(SchoolClassRecordSceneContainer);
