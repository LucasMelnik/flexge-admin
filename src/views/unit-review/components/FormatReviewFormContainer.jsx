import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FormatReviewForm from './FormatReviewForm';
import ReviewStatusFormatService from '../services/FormatReviewService';

class FormatReviewFormContainer extends Component {

  reviewStatusFormatService = new ReviewStatusFormatService();

  static propTypes = {
    unitId: PropTypes.string,
    reviewId: PropTypes.string,
    expanded: PropTypes.bool,
  };

  static defaultProps = {
    unitId: null,
    reviewId: null,
  };

  componentWillMount() {
    this.reviewStatusFormatService.init(this.props.reviewId, this.props.unitId);
  }

  render() {
    return (
      <FormatReviewForm
        expanded={this.props.expanded}
        values={this.reviewStatusFormatService.form.getValues()}
        onChange={this.reviewStatusFormatService.form.setValue}
        onSaveStatusFormat={this.reviewStatusFormatService.handleSaveStatusFormat}
        errors={this.reviewStatusFormatService.form.errors}
      />
    );
  }
}

export default observer(FormatReviewFormContainer);
