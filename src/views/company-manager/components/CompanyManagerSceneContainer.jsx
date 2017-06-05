import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanyManagerFormService from '../services/CompanyManagerFormService';
import CompanyManagerListService from '../services/CompanyManagerListService';
import CompanyManagerScene from './CompanyManagerScene';

class CompanyManagerSceneContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string.isRequired,
  }

  state = { actualScene: 'LIST' }

  componentDidMount() {
    CompanyManagerListService.load(this.props.companyId);
  }

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
    CompanyManagerListService.load(this.props.companyId);
  };

  handleChangeToForm = () => {
    CompanyManagerFormService.setInitialValues({
      company: this.props.companyId,
    }, this.handleChangeToList);
    this.setState({
      actualScene: 'FORM',
    });
  };

  handleChangeToEdit = (manager) => {
    CompanyManagerFormService.setInitialValues(manager, this.handleChangeToList);
    this.setState({
      actualScene: 'FORM',
    });
  };

  render() {
    return (
      <CompanyManagerScene
        actualScene={this.state.actualScene}
        changeToForm={this.handleChangeToForm}
        changeToList={this.handleChangeToList}
        onRowClick={this.handleChangeToEdit}
      />
    );
  }
}

export default CompanyManagerSceneContainer;
