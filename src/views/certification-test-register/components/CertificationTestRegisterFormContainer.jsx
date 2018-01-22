import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestRegisterForm from './CertificationTestRegisterForm';
import CertificationTestRegisterFormService from '../services/CertificationTestRegisterFormService';

class CertificationTestRegisterFormSceneContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string,
  };

  static defaultProps = {
    certificationTestId: null,
  };

  certificationTestRegisterFormService = new CertificationTestRegisterFormService();
  componentWillMount() {
    this.certificationTestRegisterFormService.handleLoad(this.props.certificationTestId);
  }

  render() {
    return (
      <CertificationTestRegisterForm
        onSubmit={this.certificationTestRegisterFormService.handleSubmit}
        onChange={this.certificationTestRegisterFormService.form.setValue}
        onReset={this.certificationTestRegisterFormService.form.reset}
        values={this.certificationTestRegisterFormService.form.getValues()}
        errors={this.certificationTestRegisterFormService.form.errors}
        submitting={this.certificationTestRegisterFormService.submit.fetching}
        isDirty={this.certificationTestRegisterFormService.form.isDirty}
      />
    );
  }
}

export default observer(CertificationTestRegisterFormSceneContainer);
