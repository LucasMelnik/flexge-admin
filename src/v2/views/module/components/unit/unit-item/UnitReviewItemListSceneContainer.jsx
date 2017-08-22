import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import LoadUnitService from '../../../services/LoadUnitService';
import LoadModuleService from '../../../services/LoadModuleService';
import UnitReviewItemListScene from './UnitReviewItemListScene';

class UnitReviewItemListSceneContainer extends Component {

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
    return (
      <UnitReviewItemListScene
        module={LoadModuleService.module}
        unit={this.loadUnitService.unit}
        unitId={this.props.params.unitId}
        moduleId={this.props.params.moduleId}
        fetching={this.loadUnitService.fetch.fetching || LoadModuleService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitReviewItemListSceneContainer);
