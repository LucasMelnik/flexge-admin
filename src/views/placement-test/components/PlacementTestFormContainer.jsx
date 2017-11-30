import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PlacementTestForm from './PlacementTestForm';
import PlacementTestFormService from '../services/PlacementTestFormService';

class PlacementTestFormSceneContainer extends Component {

  static propTypes = {
    placementTestId: PropTypes.string,
  };

  static defaultProps = {
    placementTestId: null,
  };

  placementTestFormService = new PlacementTestFormService();
  componentWillMount() {
    this.placementTestFormService.handleLoad(this.props.placementTestId);
  }

  render() {
    return (
      <PlacementTestForm
        onSubmit={this.placementTestFormService.handleSubmit}
        onChange={this.placementTestFormService.form.setValue}
        onReset={this.placementTestFormService.form.reset}
        values={this.placementTestFormService.form.getValues()}
        errors={this.placementTestFormService.form.errors}
        submitting={this.placementTestFormService.submit.fetching}
        isDirty={this.placementTestFormService.form.isDirty}
      />
    );
  }
}

export default observer(PlacementTestFormSceneContainer);
