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
    CompanyManagerFormService.setInitialValues(this.props.companyId, this.handleChangeToList);
    CompanyManagerListService.load(this.props.companyId);
  }

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
    CompanyManagerListService.load(this.props.companyId);
  };

  handleChangeToForm = () => {
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
      />
    );
  }
}

export default CompanyManagerSceneContainer;
