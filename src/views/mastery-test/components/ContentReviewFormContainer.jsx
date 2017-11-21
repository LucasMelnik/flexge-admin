import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ContentReviewForm from './ContentReviewForm';
import ContentReviewService from '../services/ContentReviewService';

class ContentReviewFormContainer extends Component {

  contentReviewService = new ContentReviewService();

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    masteryTestId: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
  };

  static defaultProps = {
    expanded: false,
  };

  componentWillMount() {
    this.contentReviewService.init(this.props.moduleId, this.props.masteryTestId);
  }

  render() {
    if (this.contentReviewService.form.getValue('id')) {
      return (
        <ContentReviewForm
          expanded={this.props.expanded}
          values={this.contentReviewService.form.getValues()}
          onChange={this.contentReviewService.form.setValue}
          onSendToPending={this.contentReviewService.handleSendToPending}
          onSendToNotApproved={this.contentReviewService.handleSendToNotApproved}
          onSendToApproved={this.contentReviewService.handleSendToApproved}
          errors={this.contentReviewService.form.errors}
        />
      );
    }
    return null;
  }
}

export default observer(ContentReviewFormContainer);
