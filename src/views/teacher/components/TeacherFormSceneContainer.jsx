import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TeacherFormScene from './TeacherFormScene';
import TeacherFormService from '../services/TeacherFormService';

class TeacherFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      teacherId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    TeacherFormService.handleLoad(this.props.params.teacherId);
  }

  render() {
    return (
      <TeacherFormScene />
    );
  }
}

export default observer(TeacherFormSceneContainer);
