import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ContentReviewForm from './ContentReviewForm';
import ContentReviewService from '../services/ContentReviewService';

class ContentReviewFormContainer extends Component {

  contentReviewService = new ContentReviewService();

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    reviewId: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
  };

  componentWillMount() {
    this.contentReviewService.init(this.props.reviewId, this.props.unitId);
  }

  render() {
    if (this.contentReviewService.form.getValue('id')) {
      return (
        <ContentReviewForm
          expanded={this.props.expanded}
          values={this.contentReviewService.form.getValues()}
          onChange={this.contentReviewService.form.setValue}
          onSendToReviewed={this.contentReviewService.handleSendToReviewed}
          onSendToDone={this.contentReviewService.handleSendToDone}
          errors={this.contentReviewService.form.errors}
        />
      );
    }
    return null;
  }
}

export default observer(ContentReviewFormContainer);
