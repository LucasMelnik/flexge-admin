import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UnitItemListScene from './UnitItemListScene';
import LoadUnitService from '../../../services/LoadUnitService';
import LoadModuleService from '../../../services/LoadModuleService';

class UnitItemListSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      unitId: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    LoadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    LoadModuleService.handleLoad(this.props.params.moduleId);
  }

  render() {
    return (
      <UnitItemListScene
        module={LoadModuleService.module}
        unit={LoadUnitService.unit}
        fetching={LoadUnitService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemListSceneContainer);
