import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DistributorManagerFormService from '../services/DistributorManagerFormService';
import DistributorManagerListService from '../services/DistributorManagerListService';
import DistributorManagerScene from './DistributorManagerScene';

export default class DistributorManagerSceneContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string.isRequired,
  }

  state = { actualScene: 'LIST' }

  componentDidMount() {
    DistributorManagerListService.init(this.props.distributorId);
    DistributorManagerFormService.init(this.props.distributorId, this.handleChangeToList);
  }

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
    DistributorManagerListService.load();
  };

  handleChangeToNew = () => {
    DistributorManagerFormService.setInitialValues({});
    this.setState({
      actualScene: 'FORM',
    });
  };

  handleChangeToEdit = (manager) => {
    DistributorManagerFormService.setInitialValues(manager);
    this.setState({
      actualScene: 'FORM',
    });
  };

  render() {
    return (
      <DistributorManagerScene
        actualScene={this.state.actualScene}
        changeToNew={this.handleChangeToNew}
        changeToList={this.handleChangeToList}
        changeToEdit={this.handleChangeToEdit}
      />
    );
  }
}
