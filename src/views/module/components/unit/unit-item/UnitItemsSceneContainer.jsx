import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UnitItemsScene from './UnitItemsScene';
import LoadUnitService from '../../../services/LoadUnitService';

class UnitItemsSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      unitId: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    LoadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
  }

  render() {
    return (
      <UnitItemsScene
        unit={LoadUnitService.unit}
        fetching={LoadUnitService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemsSceneContainer);
