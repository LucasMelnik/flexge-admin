import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReviewForm from './ReviewForm';
import PlacementTestReviewService from '../services/PlacementTestReviewService';

class FormatReviewFormContainer extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
    review: PropTypes.shape({}).isRequired,
  };

  componentWillMount() {
    PlacementTestReviewService.handleLoad(this.props.placementTestId, this.props.review);
  }

  render() {
    return (
      <ReviewForm
        values={PlacementTestReviewService.form.getValues()}
        onChange={PlacementTestReviewService.form.setValue}
        onSaveStatus={PlacementTestReviewService.handleSubmit}
        errors={PlacementTestReviewService.form.errors}
      />
    );
  }
}

export default observer(FormatReviewFormContainer);
