import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PlacementTestFormScene from './PlacementTestFormScene';
import PlacementTestFormService from '../services/PlacementTestFormService';

class PlacementTestFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      studentId: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    PlacementTestFormService.handleLoad(this.props.params.placementTestId);
  }

  render() {
    return (
      <PlacementTestFormScene placementTestId={this.props.params.placementTestId} />
    );
  }
}

export default observer(PlacementTestFormSceneContainer);
