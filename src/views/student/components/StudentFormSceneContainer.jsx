import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentFormScene from './StudentFormScene';
import StudentFormService from '../services/StudentFormService';

class StudentFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      studentId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    StudentFormService.handleLoad(this.props.params.studentId);
  }

  render() {
    return (
      <StudentFormScene studentId={this.props.params.studentId} />
    );
  }
}

export default observer(StudentFormSceneContainer);
