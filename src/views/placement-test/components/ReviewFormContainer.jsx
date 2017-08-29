import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FormatReviewForm from './ReviewForm';
import PlacementTestReviewService from '../services/PlacementTestReviewService';

class FormatReviewFormContainer extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    PlacementTestReviewService.handleLoad(this.props.placementTestId);
  }

  render() {
    return (
      <FormatReviewForm
        expanded={this.props.expanded}
        values={PlacementTestReviewService.form.getValues()}
        onChange={PlacementTestReviewService.form.setValue}
        onSaveStatus={PlacementTestReviewService.handleSubmit}
        errors={PlacementTestReviewService.form.errors}
      />
    );
  }
}

export default observer(FormatReviewFormContainer);
