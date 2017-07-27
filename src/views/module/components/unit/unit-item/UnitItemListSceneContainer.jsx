import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UnitItemListScene from './UnitItemListScene';
import UnitReviewItemListScene from './UnitReviewItemListScene';
import LoadUnitService from '../../../services/LoadUnitService';
import LoadModuleService from '../../../services/LoadModuleService';

class UnitItemListSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      unitId: PropTypes.string.isRequired,
    }).isRequired,
  };

  loadUnitService = new LoadUnitService();

  componentWillMount() {
    this.loadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    LoadModuleService.handleLoad(this.props.params.moduleId);
  }

  render() {
    if (!this.loadUnitService.fetch.fetching && this.loadUnitService.unit.type.name.toUpperCase() === 'REVIEW') {
      return (
        <UnitReviewItemListScene
          module={LoadModuleService.module}
          unit={this.loadUnitService.unit}
          fetching={this.loadUnitService.fetch.fetching}
        />
      );
    }
    return (
      <UnitItemListScene
        module={LoadModuleService.module}
        unit={this.loadUnitService.unit}
        fetching={this.loadUnitService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemListSceneContainer);
