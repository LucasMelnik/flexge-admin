import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PlacementTestLevelFormScene from './PlacementTestLevelFormScene';

class PlacementTestLevelFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      placementTestLevelId: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <PlacementTestLevelFormScene
        placementTestLevelId={this.props.params.placementTestLevelId}
      />
    );
  }
}

export default observer(PlacementTestLevelFormSceneContainer);
