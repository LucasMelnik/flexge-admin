import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DistributorFormScene from './DistributorFormScene';
import DistributorFormService from '../services/DistributorFormService';

class DistributorFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      distributorId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    DistributorFormService.handleLoad(this.props.params.distributorId);
  }

  render() {
    return (
      <DistributorFormScene
        distributorId={DistributorFormService.distributorId}
      />
    );
  }
}

export default observer(DistributorFormSceneContainer);
