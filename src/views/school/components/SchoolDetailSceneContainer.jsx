import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolDetailScene from './SchoolDetailScene';
import SchoolDetailService from '../services/SchoolDetailService';

class SchoolDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
      companyId: PropTypes.string,
      distributorId: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    schoolId: null,
    distributorId: null,
  }

  componentWillMount() {
    if (this.props.params.distributorId) {
      SchoolDetailService.handleLoadDistributor(this.props.params.distributorId);
    }
    if (this.props.params.companyId) {
      SchoolDetailService.handleLoadCompany(this.props.params.companyId);
    }
    SchoolDetailService.handleLoadSchool(this.props.params.schoolId);
  }

  render() {
    return (
      <SchoolDetailScene
        school={SchoolDetailService.school}
        company={SchoolDetailService.company}
        distributor={SchoolDetailService.distributor}
        schoolId={this.props.params.schoolId}
        companyId={this.props.params.companyId}
        distributorId={this.props.params.distributorId}
      />
    );
  }
}

export default observer(SchoolDetailSceneContainer);
