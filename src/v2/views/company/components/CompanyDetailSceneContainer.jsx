import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyDetailScene from './CompanyDetailScene';
import CompanyDetailService from '../services/CompanyDetailService';
import StateService from '../../../core/services/StateService';

class CompanyDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
      companyId: PropTypes.string,
      distributorId: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {

  };

  componentWillMount() {
    CompanyDetailService.handleLoad(this.props.params.companyId);
  }

  render() {
    return (
      <CompanyDetailScene
        company={CompanyDetailService.company}
        companyId={this.props.params.companyId}
      />
    );
  }
}

export default observer(CompanyDetailSceneContainer);
