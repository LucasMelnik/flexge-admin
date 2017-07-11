import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReviewFormScene from './ReviewFormScene';
import SendUnitToReviewService from '../services/SendUnitToReviewService';

class ReviewFormSceneContainer extends Component {

  sendUnitToReviewService = new SendUnitToReviewService();

  static propTypes = {
    params: PropTypes.shape({
      unitId: PropTypes.string,
      moduleId: PropTypes.string,
      reviewId: PropTypes.string,
    }),
  }

  static defaultProps = {
    params: PropTypes.shape({
      unitId: null,
      moduleId: null,
      reviewId: null,
    }),
  }

  componentWillMount() {
    this.sendUnitToReviewService.handleLoad(this.props.params.reviewId);
  }

  render() {
    return (
      <ReviewFormScene
        unitId={this.props.params.unitId}
        moduleId={this.props.params.moduleId}
        reviewId={this.props.params.reviewId}
        values={this.sendUnitToReviewService.form.getValues()}
        onChange={this.sendUnitToReviewService.form.setValue}
        status={this.sendUnitToReviewService.form.getValue('status')}
        currentStatusFormat={this.sendUnitToReviewService.currentStatusFormat}
        onSendToReviewed={this.sendUnitToReviewService.handleSendToReviewed}
        onSendToDone={this.sendUnitToReviewService.handleSendToDone}
        error={this.sendUnitToReviewService.submit.error}
        errors={this.sendUnitToReviewService.form.errors}
        review={this.sendUnitToReviewService.form.getValues()}
      />
    );
  }
}

export default observer(ReviewFormSceneContainer);
