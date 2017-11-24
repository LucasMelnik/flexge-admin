import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FormatReviewForm from './FormatReviewForm';
import ReviewStatusFormatService from '../services/FormatReviewService';

class FormatReviewFormContainer extends Component {

  reviewStatusFormatService = new ReviewStatusFormatService();

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    masteryTestId: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
  };

  static defaultProps = {
    expanded: false,
  };

  componentWillMount() {
    this.reviewStatusFormatService.init(this.props.moduleId, this.props.masteryTestId);
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
