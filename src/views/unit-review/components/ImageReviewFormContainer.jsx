import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReviewStatusImageService from '../services/ImageReviewService';
import ImageReviewForm from './ImageReviewForm';

class ImageReviewFormContainer extends Component {

  reviewStatusImageService = new ReviewStatusImageService();

  static propTypes = {
    unitId: PropTypes.string,
    reviewId: PropTypes.string,
  };

  static defaultProps = {
    unitId: null,
    reviewId: null,
  };

  componentWillMount() {
    this.reviewStatusImageService.init(this.props.reviewId, this.props.unitId);
  }

  render() {
    return (
      <ImageReviewForm
        values={this.reviewStatusImageService.form.getValues()}
        onChange={this.reviewStatusImageService.form.setValue}
        onSaveStatusImage={this.reviewStatusImageService.handleSaveStatusImage}
        errors={this.reviewStatusImageService.form.errors}
      />
    );
  }
}

export default observer(ImageReviewFormContainer);
