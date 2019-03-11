import React, { Component } from 'react';
import SchoolClassListScene from './SchoolClassListScene';

class SchoolClassListSceneContainer extends Component {

  school = {};

  componentWillMount() {
    this.school = localStorage.getItem('school');
  }

  render() {
    return (
      <SchoolClassListScene
        school={this.school}
      />
    );
  }
}

export default SchoolClassListSceneContainer;
