import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestExecutionDetail from './CertificationTestExecutionDetail';
import CertificationTestDetailService from '../services/CertificationTestDetailService';

class CertificationTestExecutionDetailContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string,
  };

  static defaultProps = {
    certificationTestId: null,
  };

  componentWillMount() {
    CertificationTestDetailService.handleLoad(this.props.certificationTestId);
  }

  render() {
    return (
      <CertificationTestExecutionDetail
        values={CertificationTestDetailService.certificationTest}
      />
    );
  }
}

export default observer(CertificationTestExecutionDetailContainer);
