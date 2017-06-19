import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import ItemFormScene from './ItemFormScene';
import ItemFormService from '../../../../item/services/ItemFormService';
import UnitItemFormService from '../../../services/UnitItemFormService';
import LoadUnitService from '../../../services/LoadUnitService';
import UnitItemListService from '../../../services/UnitItemListService';

class UnitItemsSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      unitId: PropTypes.string.isRequired,
      itemId: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    const saveItemCallback = (item, isNew) => {
      if (isNew) {
        const unitItem = {
          unit: this.props.params.unitId,
          item: item.id,
          order: UnitItemListService.items.length + 1,
        };
        UnitItemFormService.handleLinkToUnit(unitItem);
      } else {
        this.handleBack();
      }
    };
    ItemFormService.init(saveItemCallback);

    const linkUnitCallback = () => {
      this.handleBack();
    };
    UnitItemFormService.init(linkUnitCallback);

    LoadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    ItemFormService.handleLoad(this.props.params.itemId);
  }

  handleBack = () => {
    browserHistory.push(`/modules/${this.props.params.moduleId}/units/${this.props.params.unitId}/items`)
  };

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
