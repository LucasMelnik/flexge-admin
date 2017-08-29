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

  componentWillMount() {
    PlacementTestFormService.handleLoad(this.props.placementTestId);
  }

  render() {
    return (
      <PlacementTestForm
        onSubmit={PlacementTestFormService.handleSubmit}
        onChange={PlacementTestFormService.form.setValue}
        onReset={PlacementTestFormService.form.reset}
        values={PlacementTestFormService.form.getValues()}
        errors={PlacementTestFormService.form.errors}
        submitting={PlacementTestFormService.fetch.fetching}
        error={PlacementTestFormService.fetch.error}
        isDirty={PlacementTestFormService.form.isDirty}
      />
    );
  }
}

export default observer(PlacementTestFormSceneContainer);
