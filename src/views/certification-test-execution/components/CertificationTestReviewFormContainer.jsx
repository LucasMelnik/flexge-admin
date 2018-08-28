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

  componentWillMount() {
    CertificationTestReviewFormService.handleLoad(this.props.certificationTestId);
  }

  render() {
    return (
      <CertificationTestReviewForm
        onSubmit={CertificationTestReviewFormService.handleSubmit}
        onChange={CertificationTestReviewFormService.form.setValue}
        onReset={CertificationTestReviewFormService.form.reset}
        values={CertificationTestReviewFormService.form.getValues()}
        errors={CertificationTestReviewFormService.form.errors}
        submitting={CertificationTestReviewFormService.fetch.fetching}
        isDirty={CertificationTestReviewFormService.form.isDirty}
      />
    );
  }
}

export default observer(CertificationTestReviewFormContainer);
