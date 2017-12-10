import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestForm from './CertificationTestForm';
import CertificationTestFormService from '../services/CertificationTestFormService';

class CertificationTestFormContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string,
  };

  static defaultProps = {
    certificationTestId: null,
  };

  certificationTestFormService = new CertificationTestFormService();
  componentWillMount() {
    this.certificationTestFormService.handleLoad(this.props.certificationTestId);
  }

  render() {
    return (
      <CertificationTestForm
        onSubmit={this.certificationTestFormService.handleSubmit}
        onChange={this.certificationTestFormService.form.setValue}
        onReset={this.certificationTestFormService.form.reset}
        values={this.certificationTestFormService.form.getValues()}
        errors={this.certificationTestFormService.form.errors}
        submitting={this.certificationTestFormService.fetch.fetching}
        isDirty={this.certificationTestFormService.form.isDirty}
      />
    );
  }
}

export default observer(CertificationTestFormContainer);
