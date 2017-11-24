import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassDetailScene from './SchoolClassDetailScene';
import SchoolClassDetailService from '../services/SchoolClassDetailService';

class SchoolClassDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
      classId: PropTypes.string,
      companyId: PropTypes.string,
      distributorId: PropTypes.string,
    }).isRequired,
  };

  baseUrl = '';

  componentWillMount() {
    if (this.props.params.distributorId) {
      SchoolClassDetailService.handleLoadDistributor(this.props.params.distributorId);
      this.baseUrl += `/distributors/${this.props.params.distributorId}`;
    }
    if (this.props.params.companyId) {
      SchoolClassDetailService.handleLoadCompany(this.props.params.companyId);
      this.baseUrl += `/companies/${this.props.params.companyId}`;
    }
    if (this.props.params.schoolId) {
      SchoolClassDetailService.handleLoadSchool(this.props.params.schoolId);
      this.baseUrl += `/schools/${this.props.params.schoolId}`;
    }

    SchoolClassDetailService.handleLoadClass(this.props.params.schoolId, this.props.params.classId);
    this.baseUrl += `/classes/${this.props.params.classId}`;
  }

  render() {
    return (
      <SchoolClassDetailScene
        baseUrl={this.baseUrl}
        school={SchoolClassDetailService.school}
        company={SchoolClassDetailService.company}
        distributor={SchoolClassDetailService.distributor}
        class={SchoolClassDetailService.class}
        fetching={
          SchoolClassDetailService.fetchDistributor.fetching ||
          SchoolClassDetailService.fetchCompany.fetching ||
          SchoolClassDetailService.fetchSchool.fetching ||
          SchoolClassDetailService.fetchClass.fetching
        }
      />
    );
  }
}

export default observer(SchoolClassDetailSceneContainer);
