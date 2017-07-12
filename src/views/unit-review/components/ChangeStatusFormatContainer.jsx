import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ChangeStatusFormat from './ChangeStatusFormat';
import ReviewStatusFormatService from '../services/ReviewStatusFormatService';

class ChangeStatusFormatContainer extends Component {

  reviewStatusFormatService = new ReviewStatusFormatService();

  static propTypes = {
    unitId: PropTypes.string,
    reviewId: PropTypes.string,
    currentStatusFormat: PropTypes.string,
  }

  static defaultProps = {
    unitId: null,
    reviewId: null,
    currentStatusFormat: null,
  }

  render() {
    return (
      <ChangeStatusFormat
        unitId={this.props.unitId}
        reviewId={this.props.reviewId}
        values={this.reviewStatusFormatService.form.getValues()}
        onChange={this.reviewStatusFormatService.form.setValue}
        currentStatusFormat={this.props.currentStatusFormat}
        onSaveStatusFormat={this.reviewStatusFormatService.handleSaveStatusFormat}
        error={this.reviewStatusFormatService.submit.error}
        errors={this.reviewStatusFormatService.form.errors}
      />
    );
  }
}

export default observer(ChangeStatusFormatContainer);
