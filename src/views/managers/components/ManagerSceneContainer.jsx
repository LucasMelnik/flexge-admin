import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ManagerFormService from '../services/ManagerFormService';
import ManagerListService from '../services/ManagerListService';
import ManagerScene from './ManagerScene';

export default class ManagerSceneContainer extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    endpointUrl: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
  };

  state = { actualScene: '' };

  componentDidMount() {
    ManagerListService.init(this.props.endpointUrl);
    ManagerFormService.init(this.props.endpointUrl, this.handleChangeToList);
    this.handleChangeToList();
  }

  handleChangeToList = () => {
    ManagerListService.load();
    this.setState({
      actualScene: 'LIST',
    });
  };

  handleChangeToForm = () => {
    ManagerFormService.setInitialValues(this.props.initialValues);
    this.setState({
      actualScene: 'FORM',
    });
  };

  handleChangeToEdit = (manager) => {
    ManagerFormService.setInitialValues(manager);
    this.setState({
      actualScene: 'FORM',
    });
  };

  render() {
    return (
      <ManagerScene
        title={this.props.title}
        actualScene={this.state.actualScene}
        changeToForm={this.handleChangeToForm}
        changeToList={this.handleChangeToList}
        onEdit={this.handleChangeToEdit}
      />
    );
  }
}
