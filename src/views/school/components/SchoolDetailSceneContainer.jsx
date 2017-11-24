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
  };

  baseUrl = '';

  componentWillMount() {
    if (this.props.params.distributorId) {
      SchoolDetailService.handleLoadDistributor(this.props.params.distributorId);
      this.baseUrl += `/distributors/${this.props.params.distributorId}`;
    }
    if (this.props.params.companyId) {
      SchoolDetailService.handleLoadCompany(this.props.params.companyId);
      this.baseUrl += `/companies/${this.props.params.companyId}`;
    }
    SchoolDetailService.handleLoadSchool(this.props.params.schoolId);
    this.baseUrl += `/schools/${this.props.params.schoolId}`;
  }

  render() {
    return (
      <SchoolDetailScene
        school={SchoolDetailService.school}
        company={SchoolDetailService.company}
        distributor={SchoolDetailService.distributor}
        fetching={
          SchoolDetailService.fetchSchool.fetching ||
          SchoolDetailService.fetchCompany.fetching ||
          SchoolDetailService.fetchDistributor.fetching
        }
        baseUrl={this.baseUrl}
      />
    );
  }
}

export default observer(SchoolDetailSceneContainer);
