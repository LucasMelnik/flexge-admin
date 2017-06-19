import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemFormScene from './ItemFormScene';
import ItemFormService from '../../../../item/services/ItemFormService';
import LoadUnitService from '../../../services/LoadUnitService';

class UnitItemsSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      unitId: PropTypes.string.isRequired,
      itemId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    LoadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    ItemFormService.handleLoad(this.props.params.itemId);
  }

  render() {
    return (
      <ItemFormScene
        unit={LoadUnitService.unit}
        itemId={this.props.params.itemId}
      />
    );
  }
}

export default observer(UnitItemsSceneContainer);
