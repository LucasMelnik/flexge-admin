import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestReviewForm from './CertificationTestReviewForm';
import CertificationTestReviewFormService from '../services/CertificationTestReviewFormService';

class CertificationTestReviewFormContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string,
  };

  static defaultProps = {
    certificationTestId: null,
  };

  certificationTestReviewFormService = new CertificationTestReviewFormService();
  componentWillMount() {
    this.certificationTestReviewFormService.handleLoad(this.props.certificationTestId);
  }

  render() {
    return (
      <CertificationTestReviewForm
        onSubmit={this.certificationTestReviewFormService.handleSubmit}
        onChange={this.certificationTestReviewFormService.form.setValue}
        onReset={this.certificationTestReviewFormService.form.reset}
        values={this.certificationTestReviewFormService.form.getValues()}
        errors={this.certificationTestReviewFormService.form.errors}
        submitting={this.certificationTestReviewFormService.fetch.fetching}
        isDirty={this.certificationTestReviewFormService.form.isDirty}
      />
    );
  }
}

export default observer(CertificationTestReviewFormContainer);
