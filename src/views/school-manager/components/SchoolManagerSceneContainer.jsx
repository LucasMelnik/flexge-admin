import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchoolManagerFormService from '../services/SchoolManagerFormService';
import SchoolManagerListService from '../services/SchoolManagerListService';
import SchoolManagerScene from './SchoolManagerScene';

class SchoolManagerSceneContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  }

  state = { actualScene: 'LIST' }

  componentDidMount() {
    SchoolManagerListService.init(this.props.schoolId);
    SchoolManagerFormService.init(this.props.schoolId, this.handleChangeToList);
  }

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
    SchoolManagerListService.load();
  };

  handleChangeToNew = () => {
    SchoolManagerFormService.setInitialValues({});
    this.setState({
      actualScene: 'FORM',
    });
  };

  handleChangeToEdit = (manager) => {
    SchoolManagerFormService.setInitialValues(manager);
    this.setState({
      actualScene: 'FORM',
    });
  };

  render() {
    return (
      <SchoolManagerScene
        actualScene={this.state.actualScene}
        changeToNew={this.handleChangeToNew}
        changeToList={this.handleChangeToList}
        changeToEdit={this.handleChangeToEdit}
      />
    );
  }
}

export default SchoolManagerSceneContainer;
