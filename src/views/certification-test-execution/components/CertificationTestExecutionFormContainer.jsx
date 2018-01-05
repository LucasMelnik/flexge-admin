import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestExecutionForm from './CertificationTestExecutionForm';
import CertificationTestExecutionFormService from '../services/CertificationTestExecutionFormService';

class CertificationTestExecutionFormContainer extends Component {

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
      <CertificationTestExecutionForm
        onSubmit={this.certificationTestExecutionFormService.handleSubmit}
        onChange={this.certificationTestExecutionFormService.form.setValue}
        onReset={this.certificationTestExecutionFormService.form.reset}
        values={this.certificationTestExecutionFormService.form.getValues()}
        errors={this.certificationTestExecutionFormService.form.errors}
        submitting={this.certificationTestExecutionFormService.fetch.fetching}
        isDirty={this.certificationTestExecutionFormService.form.isDirty}
      />
    );
  }
}

export default observer(CertificationTestExecutionFormContainer);
