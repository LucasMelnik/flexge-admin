import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestExecutionDetail from './CertificationTestExecutionDetail';
import CertificationTestExecutionFormService from '../services/CertificationTestExecutionFormService';

class CertificationTestExecutionDetailContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string,
  };

  static defaultProps = {
    certificationTestId: null,
  };

  certificationTestExecutionFormService = new CertificationTestExecutionFormService();
  componentWillMount() {
    this.certificationTestExecutionFormService.handleLoad(this.props.certificationTestId);
  }

  render() {
    return (
      <CertificationTestExecutionDetail
        values={this.certificationTestExecutionFormService.form.getValues()}
      />
    );
  }
}

export default observer(CertificationTestExecutionDetailContainer);
