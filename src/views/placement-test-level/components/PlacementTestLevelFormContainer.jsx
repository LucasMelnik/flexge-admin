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

  componentWillMount() {
    PlacementTestLevelFormService.handleLoad(this.props.placementTestLevelId);
  }

  render() {
    return (
      <PlacementTestLevelForm
        onSubmit={PlacementTestLevelFormService.handleSubmit}
        onChange={PlacementTestLevelFormService.form.setValue}
        onReset={PlacementTestLevelFormService.form.reset}
        values={PlacementTestLevelFormService.form.getValues()}
        errors={PlacementTestLevelFormService.form.errors}
        submitting={PlacementTestLevelFormService.fetch.fetching}
        isDirty={PlacementTestLevelFormService.form.isDirty}
      />
    );
  }
}

export default observer(PlacementTestLevelFormContainer);
