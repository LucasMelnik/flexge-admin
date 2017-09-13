import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CourseFormScene from './CourseFormScene';

class CourseFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      courseId: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <CourseFormScene
        courseId={this.props.params.courseId}
      />
    );
  }
}

export default observer(CourseFormSceneContainer);
