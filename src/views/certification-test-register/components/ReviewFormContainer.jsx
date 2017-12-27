import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReviewForm from './ReviewForm';
import CertificationTestReviewService from '../services/CertificationTestReviewService';

class ReviewFormContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string.isRequired,
    review: PropTypes.shape({}).isRequired,
  };

  componentWillMount() {
    CertificationTestReviewService.handleLoad(this.props.certificationTestId, this.props.review);
  }

  render() {
    return (
      <ReviewForm
        values={CertificationTestReviewService.form.getValues()}
        onChange={CertificationTestReviewService.form.setValue}
        onSaveStatus={CertificationTestReviewService.handleSubmit}
        errors={CertificationTestReviewService.form.errors}
      />
    );
  }
}

export default observer(ReviewFormContainer);
