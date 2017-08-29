import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassFormScene from './SchoolClassFormScene';
import SchoolClassDetailService from '../services/SchoolClassDetailService';

class SchoolClassFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
      distributorId: PropTypes.string,
      companyId: PropTypes.string,
      classId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    if (this.props.params.distributorId) {
      SchoolClassDetailService.handleLoadDistributor(this.props.params.distributorId);
    }

    if (this.props.params.companyId) {
      SchoolClassDetailService.handleLoadCompany(this.props.params.companyId);
    }

    if (this.props.params.schoolId) {
      SchoolClassDetailService.handleLoadSchool(this.props.params.schoolId);
    }
  }

  render() {
    return (
      <SchoolClassFormScene
        companyId={this.props.params.companyId}
        schoolId={this.props.params.schoolId}
        distributorId={this.props.params.distributorId}
        classId={this.props.params.classId}
        company={SchoolClassDetailService.company}
        distributor={SchoolClassDetailService.distributor}
        school={SchoolClassDetailService.school}
      />
    );
  }
}

export default observer(SchoolClassFormSceneContainer);
