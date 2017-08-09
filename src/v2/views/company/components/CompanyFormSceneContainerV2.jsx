import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CompanyFormScene from './CompanyFormScene';
import CompanyFormService from '../services/CompanyFormService';

class CompanyFormSceneContainerV2 extends Component {

  static propTypes = {
    params: PropTypes.shape({
      companyId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    CompanyFormService.handleLoad(this.props.params.companyId);
  }

  render() {
    return (
      <CompanyFormScene
        companyId={CompanyFormService.companyId}
      />
    );
  }
}

export default observer(CompanyFormSceneContainerV2);
