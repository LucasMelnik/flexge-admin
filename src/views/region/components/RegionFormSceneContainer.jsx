import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import RegionFormScene from './RegionFormScene';

class RegionFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      regionId: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <RegionFormScene
        regionId={this.props.params.regionId}
      />
    );
  }
}

export default observer(RegionFormSceneContainer);
