import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchoolClassScene from './SchoolClassScene';
import SchoolClassListService from '../services/SchoolClassListService';
import schoolClassFormService from '../services/SchoolClassFormService';

export default class SchoolClassSceneContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  };

  state = { actualScene: 'LIST' };

  componentWillMount() {
    SchoolClassListService.init(this.props.schoolId);
    schoolClassFormService.init(this.props.schoolId, this.handleChangeToList);
  }

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
    SchoolClassListService.load();
  }

  handleChangeToNew = () => {
    schoolClassFormService.form.setInitialValues({});
    this.setState({
      actualScene: 'FORM',
    });
  }

  handleChangeToEdit = (classId) => {
    schoolClassFormService.handleLoad(classId);
    this.setState({
      actualScene: 'FORM',
    });
  }

  render() {
    return (
      <SchoolClassScene
        actualScene={this.state.actualScene}
        changeToList={this.handleChangeToList}
        changeToNew={this.handleChangeToNew}
        changeToEdit={this.handleChangeToEdit}
      />
    );
  }
}
