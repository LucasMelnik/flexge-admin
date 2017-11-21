import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolFormScene from './SchoolFormScene';
import SchoolDetailService from '../services/SchoolDetailService';

class SchoolFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
      distributorId: PropTypes.string,
      companyId: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    if (this.props.params.distributorId) {
      SchoolDetailService.handleLoadDistributor(this.props.params.distributorId);
    }

    if (this.props.params.companyId) {
      SchoolDetailService.handleLoadCompany(this.props.params.companyId);
    }
  }

  render() {
    return (
      <SchoolFormScene
        companyId={this.props.params.companyId}
        schoolId={this.props.params.schoolId}
        company={SchoolDetailService.company}
        distributorId={this.props.params.distributorId}
        distributor={SchoolDetailService.distributor}
      />
    );
  }
}

export default observer(SchoolFormSceneContainer);
