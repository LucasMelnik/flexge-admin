import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PlacementTestLevelForm from './PlacementTestLevelForm';
import PlacementTestLevelFormService from '../services/PlacementTestLevelFormService';

class PlacementTestLevelFormContainer extends Component {

  static propTypes = {
    placementTestLevelId: PropTypes.string,
  };

  static defaultProps = {
    placementTestLevelId: null,
  };

  placementTestLevelFormService = new PlacementTestLevelFormService();
  componentWillMount() {
    this.placementTestLevelFormService.handleLoad(this.props.placementTestLevelId);
  }

  render() {
    return (
      <PlacementTestLevelForm
        onSubmit={this.placementTestLevelFormService.handleSubmit}
        onChange={this.placementTestLevelFormService.form.setValue}
        onReset={this.placementTestLevelFormService.form.reset}
        values={this.placementTestLevelFormService.form.getValues()}
        errors={this.placementTestLevelFormService.form.errors}
        submitting={this.placementTestLevelFormService.submit.fetching}
        isDirty={this.placementTestLevelFormService.form.isDirty}
      />
    );
  }
}

export default observer(PlacementTestLevelFormContainer);
