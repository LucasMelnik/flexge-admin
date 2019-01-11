import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import UnitItemFormScene from './UnitItemFormScene';
import LoadModuleService from '../../../services/LoadModuleService';
import LoadUnitService from '../../../services/LoadUnitService';
import UnitItemListService from '../../../services/UnitItemListService';

class UnitItemsFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      unitId: PropTypes.string.isRequired,
      itemId: PropTypes.string,
      reviewId: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  loadUnitService = new LoadUnitService();

  componentWillMount() {
    this.loadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    LoadModuleService.handleLoad(this.props.params.moduleId);
  }

  handleBack = () => {
    if (this.props.params.reviewId) {
      browserHistory.push(`/modules/${this.props.params.moduleId}/units/${this.props.params.unitId}/reviews/${this.props.params.reviewId}`)
    } else {
      browserHistory.push(`/modules/${this.props.params.moduleId}/units/${this.props.params.unitId}/items`)
    }
  };

  render() {
    return (
      <UnitItemFormScene
        unit={this.loadUnitService.unit}
        module={LoadModuleService.module}
        itemId={this.props.params.itemId}
        reviewId={this.props.params.reviewId}
        itemOrder={UnitItemListService.items.length + 1}
        onBack={this.handleBack}
        fetching={this.loadUnitService.fetch.fetching || LoadModuleService.fetch.fetching}
        copyFrom={get(this.props.location, 'state.item', null)}
      />
    );
  }
}

export default observer(UnitItemsFormSceneContainer);
