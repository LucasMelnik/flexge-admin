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
  }

  static defaultProps = {
    schoolId: null,
    classId: null,
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

    SchoolClassDetailService.handleLoadClass(this.props.params.schoolId, this.props.params.classId);
  }

  render() {
    return (
      <SchoolClassDetailScene
        school={SchoolClassDetailService.school}
        company={SchoolClassDetailService.company}
        distributor={SchoolClassDetailService.distributor}
        class={SchoolClassDetailService.class}
        schoolId={this.props.params.schoolId}
        classId={this.props.params.classId}
        companyId={this.props.params.companyId}
        distributorId={this.props.params.distributorId}
      />
    );
  }
}

export default observer(SchoolClassDetailSceneContainer);
